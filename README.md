![image](https://github.com/DaoTai/EST-front-end/assets/88814089/f0c1f44c-2035-4e39-9070-efa83dfc74b7)
# Video demo: https://tinyurl.com/3dbha6ux
# Link: https://est-front-end-git-main-daotai.vercel.app/
# Target
EST EDU is a web app built to help users learn programming easy and convenient. Moreover, author intergared AI feature with LSTM to predict suitale jobs in IT field

# Technologies
1. Front-end
- Using framework NextJS for routes, handle logic client-side & server-side, optimization, ...
- Using NextAuth for OAuth2 is optional for authentication.
- Using Material UI, Highchart, ... to design UI.
- Using Socket.io, Simple-peer to perform chat and video call realtime.
2. Back-end
- Using framework ExpressJS to build RESTful API.
- Storing data by MongoDB.
- Storing image, video by Cloudinary, Firebase.
- Using JWT, Nodemailer for authenticated features.
3. AI
- Building and training users's data for LSTM to predict.
- Using other library like numpy, sklearn, tensorflow, ... to build model.

# Description
To help users can learn online programming courses with some features like enrol courses, do excercises, comment lessons. Using Websocket and WebRTC to chat realtime and video call. Users can be predicted suitable jobs themselves by LSTM. Furthermore,
admin manage system informations like accounts, courses, ... by export files, charts (Detail in github & demo link). I deployed product on Vercel and Render

# Features with roles
1. Admin: manage accounts (block,authorize), courses, lessons, questions, CV, statistical charts, ...
2. Teacher: manage quanlity their courses, lessons, questions, members, ...
3. User: manage profile (information, password, CV), private courses (lessons, questions, comment), chat (message, video call), notifications from system, ...


