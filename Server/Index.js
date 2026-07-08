const express = require('express')
const cors = require('cors')
const http = require('http')
const bodyparser = require('body-parser')
const cookieParser = require('cookie-parser')
const admin = require('./Models/Admin')

const app = express()
app.use(express.json({ limit: '10mb' }))
app.use(cookieParser())
app.use(cors({
    origin: 'https://taskflowtic.vercel.app',
    credentials: true,
    methods: ['GET', 'PUT', 'PATCH', 'DELETE']
}
))
const server = http.createServer(app)
const PORT = process.env.PORT || 8000;

// db 
const dbconnect = require('./DBConnection')
dbconnect()

// routers
const SignUp = require('./Router/SignUp')
const SignIn = require('./Router/SignIn')

const GetData = require('./Router/GetData')
const CreateTask = require('./Router/CreateTask')
const TodayTask = require('./Router/GetTodayTask')
const AllTasks = require('./Router/GetAllTasks')
const UpdateProfile = require('./Router/UpdateProfile')
const TaskDetail = require('./Router/TaskDetail')
const UpdateTask = require('./Router/UpdateTask')
const DeleteTask = require('./Router/DeleteTask')
const DWMTask = require('./Router/GetDWMtasks')
const DeleteAccount = require('./Router/DeleteAccount')
const UpdatePassword = require('./Router/UpdatePassword')
const CreateNewTicketUser = require('./Router/CreateNewTicketUser')
const UserContactSupportAllTicket = require('./Router/UserContactSupportAllTicket')
const PasswordResetLink = require('./Router/SendPasswordResetLink')
const ResetPassword = require('./Router/ResetPassword')

const UpdateEmail = require('./Router/UpdateEmail')
const VerifyOtp = require('./Router/UpdateEmail')

// admin
const AdminSignIn = require('./Router/AdminRoute/AdminSignIn')
const AdminDashboard = require('./Router/AdminRoute/AdminDashboard')
const SearchUser = require('./Router/AdminRoute/SearchUser')
const ConversationStatusUpdate = require('./Router/AdminRoute/UpdateConversationStatus')
const CreateAnnouncement = require('./Router/AdminRoute/CreateAnnouncement')
const AdminGetUserProfile = require('./Router/AdminRoute/AdminGetUserProfile')
const UserStatusConroller = require('./Router/AdminRoute/UserStatusController')

// shared
const AllIssues = require('./Router/SharedRoutes/AllIssues')
const SupportCoversationMessage = require('./Router/SharedRoutes/SupportCoversation')
const CreateConversationMessage = require('./Router/SharedRoutes/CreateConversationMessage') //new msg
const GetAnnouncements = require('./Router/SharedRoutes/AllAnnouncements')

// refresh token
const RefreshToken = require('./Router/authController/refreshToken')
const SignOut = require('./Router/authController/SignOutUser')

app.post('/signup', SignUp)
app.get('/getdata', GetData)
app.post('/signin', SignIn)
app.post('/createtask', CreateTask)
app.get('/todaytask', TodayTask)
app.get('/alltasks/:datea', AllTasks)
app.patch('/updateprofile', UpdateProfile)
app.get('/taskdetail/:taskId', TaskDetail)
app.patch('/updatetask/:taskId', UpdateTask)
app.delete('/deletetask/:taskId', DeleteTask)
app.get('/getdwmtask/:repeatType', DWMTask)
app.delete('/deleteAccount/:_id', DeleteAccount)
app.post('/requestotp', UpdateEmail)
app.patch('/requestEmailupdate', VerifyOtp)
app.patch('/updatepassword', UpdatePassword)
app.post('/support/message', CreateNewTicketUser)
app.get('/contactsupportmessaege', UserContactSupportAllTicket)
app.post('/password-reset-link', PasswordResetLink)
app.patch('/reset-password/:token', ResetPassword)

app.post('/admin/signin', AdminSignIn)
app.get('/adminDashboard', AdminDashboard)
app.get('/admin/searchuser/:Query', SearchUser)
app.patch('/admin/contactsupport/:conversationId', ConversationStatusUpdate)
app.post('/admin/createannouncement', CreateAnnouncement)
app.get('/admin/userProfile/:userId', AdminGetUserProfile)
app.patch('/admin/user/:userId/suspend', UserStatusConroller)

// shared
app.get('/contactsupport/allissues', AllIssues)
app.get('/support/message/:conversationId', SupportCoversationMessage)
app.post('/contactsupport/create/:conversationId', CreateConversationMessage)
app.get('/announcements', GetAnnouncements)

// refersh token api 
app.post('/auth/refreshtoken', RefreshToken)
app.post('/signout', SignOut)


server.listen(PORT, () => {
    console.log(`server is started on ${PORT}`)
})