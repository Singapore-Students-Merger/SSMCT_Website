
# SSMCT Website
Website to advertise SSMCT and showcase its past achievements.

## Table of Contents
- [Introduction](#introduction)
- [Planned Features/Pages](#planned-featurespages)
- [Features that may be added (To be discussed)](#features-that-may-be-added-to-be-discussed)
- [Setup Instructions](#setup-instructions)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [Resources](#resources)
- [License](#license)

## Introduction
This project is the official website for SSMCT, designed to advertise the group and showcase its past achievements. It also provides a platform for members to share their writeups, stay updated with group activities, and learn more about the team.

## Planned Features/Pages:
1. **About Us**
   - To introduce our group and what we do
   - Mention our events and bonding activities, etc.
2. **Achievements**
   - To showcase our achievements and past CTFs won
3. **Members**
   - To showcase all our members and their achievements
4. **Blog**
   - Updates on our activities or events, etc.
5. **Writeups**
   - Allow members to upload and share their own writeups

## Features that may be added (To be discussed)
1. Sign-in and upload feature (Can be simplified to uploading through GitHub)
2. Challenge Hosting & Creation Feature
3. Comment & Kudo Feature

## Setup Instructions
### Prerequisites
- Docker and Docker Compose installed on your machine.

### Running the Project
1. Clone the repository:
   ```bash
   git clone https://your-private-repo-link.git
   cd SSMCT_Website
   ```

2. Build and run the Docker container:
   ```bash
   docker-compose up --build
   ```



### Stopping the Project
To stop the project, simply run:
```bash
docker-compose down
```

### Building for Production
To build the production image:
```bash
docker-compose -f docker-compose.prod.yml up --build
```

### Additional Notes
All dependencies and environment configurations are handled within the Docker containers, so you don’t need to manually install Node.js, npm, or other tools locally.

## Technologies Used
- Docker (Containerization)
- (TBC)

## Contributing
To Contribute, first assign yourself to one of the issues in the github issues tab, then:

1. Create a new branch:
   ```bash
   git checkout -b feature/my-feature
   ```
2. Make your changes and commit them:
   ```bash
   git commit -m "Add my new feature"
   ```
3. Push to the branch:
   ```bash
   git push origin feature/my-feature
   ```
4. Open a pull request.

Please read our contributing guidelines for more details.

## Resources
- [Figma Design File](https://www.figma.com/design/gnKPvEwhRAPhjQFijYbkPj/SSMCT-Website?node-id=0-1&t=qZfgYigqbIHiDeh9-1)

## License
This project is licensed under the MIT License - see the LICENSE file for details.
