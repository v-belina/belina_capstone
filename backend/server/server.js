const express = require("express");
const app = express();
const cors = require('cors')
const loginRoute = require('./routes/userLogin')
const getAllUsersRoute = require('./routes/userGetAllUsers')
const registerRoute = require('./routes/userSignUp')
const getUserByIdRoute = require('./routes/userGetUserById')
const dbConnection = require('./config/db.config')
const editUser = require('./routes/userEditUser')
const deleteUser = require('./routes/userDeleteAll')

//ITEMS
const itemList = require('./routes/item/itemGetAllItems')
const newItem = require('./routes/item/itemCreateItem')
const getItemById = require('./routes/item/itemGetItemById')
const deleteAllItems = require('./routes/item/itemDeleteAll')
const editItemRoute = require("./routes/item/itemEditItem") // Make sure the path is correct
const deleteItemByIdRoute = require("./routes/item/itemDeleteById"); // Make sure to use the correct filename here

//TICKETS
const createNewTicketRouter = require("./routes/tickets/ticketCreateNew")
const getAllTicketsRoute = require('./routes/tickets/ticketGetAll')
const deleteTicketRoute = require('./routes/tickets/ticketDeleteById')
const deleteAll = require("./routes/tickets/ticketDeletAll")
const editTicketRoute = require('./routes/tickets/ticketEditTicket')
const getTicketById = require('./routes/tickets/ticketGetById')

require('dotenv').config();
const SERVER_PORT = 8081

dbConnection()
app.use(cors({origin: '*'}))
app.use(express.json())
app.use(cors());

app.use('/user', loginRoute)
app.use('/user', registerRoute)
app.use('/user', getAllUsersRoute)
app.use('/user', getUserByIdRoute)
app.use('/user', editUser)
app.use('/user', deleteUser)

//ITEM
app.use('/item', itemList)
app.use('/item', newItem)
app.use('/item', getItemById)
app.use('/item', deleteAllItems)
app.use("/item", deleteItemByIdRoute);
app.use("/item", editItemRoute);
app.use("/item", require("./routes/item/itemEditItem"));
app.use("/item", require("./routes/item/itemGetItemByDB"));

//TICKETS
app.use('/ticket', createNewTicketRouter)
app.use('/ticket', getAllTicketsRoute)
app.use('/ticket', deleteTicketRoute)
app.use('/ticket', deleteAll)
app.use('/ticket', editTicketRoute)
app.use('/ticket', getTicketById)

app.listen(SERVER_PORT, (req, res) => {
    console.log(`The backend service is running on port ${SERVER_PORT} and waiting for requests.`);
})
