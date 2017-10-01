# Poll-Up

A user-based online simple poll generator.

## Stack
Front-end: Pug  
Back-end: Node.js (express), MongoDB  

## Features:
* Register to create polls
* Login to view and delete your polls
* Non-authenticated users can view/vote on polls
* All created polls can be seen

#### Sample poll: [What do you have for breakfast?](http://poll-up.herokuapp.com/poll/59a5789e279f6d0011de0088)

<p float="left">
  <img src="https://imgur.com/BjPXSZF.png" alt="Poll" data-canonical-src="https://imgur.com/BjPXSZF.png" width="400"/>
  <img src="https://imgur.com/wBEXAWt.png" alt="Results" data-canonical-src="https://imgur.com/wBEXAWt.png" width="400"/>
</p>

## Installation (local)

Install using terminal, or optionally download from link above:
```
git clone https://github.com/aos/poll-up.git
cd poll-up 
npm install
```

Remove `.sample` from `.env` file name.

Run each command in its own terminal instance:  
- `npm run start`
- Mongo: `mongod`

### TODO:
- [x] User authentication (register, login)
- [x] Generate polls and save to database
- [x] Display polls to users
- [x] Vote on polls -- (IP-restricted)
- [x] Graph poll results
- [x] Password reset (token-based)
- [x] Clean up layout
- [ ] Private polls
- [ ] Multiple selections
