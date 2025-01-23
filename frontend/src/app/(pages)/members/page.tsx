import Hero from "@/components/Hero";
import { Members } from "@/types/members";
import SpecialMembersCard from "./SpecialMemberCard";
import MemberCard from "./MemberCard";
import { twMerge } from "tailwind-merge";
import { getCachedMembers } from "@/app/api/members/route";
const admins: Members[] = [
    {
        title: "Twin No 1",
        username: "Gr0undUp",
        realName: "Chan Si Yu David",
        image: "/member/david.png",
        roles: ["admin"],
    },
    {
      title: "Admin",
      username: "P3RPL3X",
      realName: "Ravin Nagpal",
      image: "/member/david.png",
      roles: ["admin"],
    },
    {
        title: "Founder of SSMCT",
        username: "gatari",
        realName: "gatari",
        image: "/member/david.png",
        roles: ["admin"],
    },
    {
      title: "Founder of SSMCT",
      username: "bo wen",
      realName: "bo wen",
      image: "/member/david.png",
      roles: ["admin"],
  },
  {
    title: "Founder of SSMCT",
    username: "_blueplume",
    realName: "_blueplume",
    image: "/member/david.png",
    roles: ["admin"],
},
{
  title: "Founder of SSMCT",
  username: "annie110100",
  realName: "annie110100",
  image: "/member/david.png",
  roles: ["admin"],
},
{
  title: "pwn star",
  username: "blueplume (nyjc)",
  realName: "greenplume",
  image: "/member/greenplume.png",
  roles: ["admin"],
},

{
  title: "re scrub",
  username: "blueplume (np)",
  realName: "greenplume",
  image: "/member/greenplume.png",
  roles: ["admin"],
},
]
const baba:Members = {
    title: "Lead Developer",
    username: "Baba is Dead and Single",
    realName: "Chua Zhong Ding",
    roles: ["Web Developer"],
  }

const webDevs: Members[] = [

  {
    title:"Full Stack Developer",
    username: "EliteCollapseZ is taken",
    realName: "Liou Larissa",
    roles: ["Web Developer"],
  },
  {
    title:"Frontend Developer",
    username: "P3RPL3X",
    realName: "Ravin Nagpal",
    roles: ["Web Developer"],
  },
  {
    title:"Frontend Developer",
    username: "Ultraduck",
    realName: "Ultraduck",
    roles: ["Web Developer"],
  },
]

export default async function MembersPage(props) {
  const members = await getCachedMembers(); 
  const gridStyle = "grid grid-cols-2 lg:grid-cols-3 gap-x-12 lg:gap-x-32 px-4 lg:px-16 my-16 gap-y-8 lg:gap-y-16";
  return (
    <div>
      <Hero title = "Members" bgImage="/backgrounds/members.png"/>
      <section className="px-2 lg:px-32 w-full box-border my-4">
        <h2 className="text-white text-5xl font-bold text-center lg:text-left">Admins</h2>
        <div className={gridStyle}>
        {admins.map((member) => (
            <SpecialMembersCard key={member.username} member={member} />
        ))}
        </div>
      </section>
      <section className="px-2 lg:px-32 w-full box-border my-12">
        <h2 className="text-white text-5xl font-bold text-center lg:text-left">Web Development Committee</h2>

        <div className={gridStyle}>
          <div className="lg:block hidden"></div>
          <SpecialMembersCard member={baba} />
          <div className="lg:block hidden"></div>
        {webDevs.map((member) => (
            <SpecialMembersCard key={member.username} member={member} />
        ))}
        </div>
      </section>
      <section className="px-2 lg:px-32 w-full box-border my-12">
        <h2 className="text-white text-5xl font-bold text-center lg:text-left">Our Members</h2>
        <div className={twMerge(gridStyle,"lg:gap-x-10 gap-x-4")}>
        {members.map((member, idx) => (
            <MemberCard key={member.username} member={member} idx = {idx}/>
        ))}
        </div>
      </section>
    </div>
  );
}