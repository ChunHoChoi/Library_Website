const express = require('express');
const app = express();
const port = 3000;
app.use(express.urlencoded({ extend: true }));

const Books = [
    {id:0 , Book: `Great Expectations` , Author: `Charles Dickens` , Available: true, Borrower:`` },
    {id:1 , Book: `Moby Dick` , Author: `Herman Melville` , Available: true, Borrower:`` },
    {id:2 , Book: `Harry Potter` , Author: `JK Rowling` , Available: true, Borrower:`` },
    {id:3 , Book: `Lord of the Rings` , Author: `JRR Tolkien` , Available: true, Borrower:`` },
    {id:4 , Book: `Lord of the Flies` , Author: `William Golding` , Available: true, Borrower:`` },
    {id:5 , Book: `Of Mice and Men` , Author: `John Steinbeck` , Available: true, Borrower:`` },
    {id:6 , Book: `The Hunt for Red October` , Author: `Tom Clancy` , Available: true, Borrower:`` },
    {id:7 , Book: `Mobile Suit Gundam` , Author: `Yoshiyuki Tomino` , Available: true, Borrower:`` },
    {id:8 , Book: `Mechanicum` , Author: `Graham Mcneill` , Available: true, Borrower:`` },
    {id:9 , Book: `BorrowedBookTest` , Author: `Chun` , Available: false, Borrower: 12345 },
]

const NumofBooks = Books.length

const indexHTMLOutput = `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Library Main</title>
    </head>
    <body>
        <div style="padding: 5px; margin: 1%; border-radius: 15px; background-color: gray;">
            <h1 style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: bold; text-align: center; border-radius: 15px; background-color: darkgray; margin: 10px 10px 10px 2px;">Welcome to Chun's Library</h1>
            <div style="padding-left: 20px; padding-right: 20px; padding-bottom: 20px; padding-top: 1px; margin: 1%; border-radius: 15px; background-color: lightgray;">
                <h2 style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; text-align: center;">Actions:</h2>
                <ui><a href="/List" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 10px; margin:1%; border-radius: 15px; background-color: darkgray; border: solid;" >List All Books</a></li>
                <ui><a href="/Borrow" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 10px; margin:1%; border-radius: 15px; background-color: darkgray; border: solid;" >Borrow a Book</a></li>
                <ui><a href="/Return" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 10px; margin:1%; border-radius: 15px; background-color: darkgray; border: solid;" >Return a Book</a></li>    
            </div>
        </div>
    </body>
</html>
`
const listHTMLOutput1 = `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Book List</title>
    </head>
    <body>
        <div style="padding: 5px; margin: 1%; border-radius: 15px; background-color: gray;">
            <h1 style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: bold; text-align: center; border-radius: 15px; background-color: darkgray; margin: 10px 10px 10px 2px;">List of Books</h1>
            <div style="padding-left: 20px; padding-right: 20px; padding-bottom: 20px; padding-top: 1px; margin: 1%; border-radius: 15px; background-color: lightgray;">
                <h2 style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; text-align: center;">Actions:</h2>
                <ui><a href="/Borrow" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 10px; margin:1%; border-radius: 15px; background-color: darkgray; border: solid;" >Borrow a Book</a></li>
                <ui><a href="/Return" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 10px; margin:1%; border-radius: 15px; background-color: darkgray; border: solid;" >Return a Book</a></li>  
                <ui><a href="/" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 10px; margin:1%; border-radius: 15px; background-color: darkgray; border: solid;" >Return to homepage</a></li>   
            </div>
`

const listHTMLOutput2 = `
            
        </div>
    </body>
</html>
`
const borrowHTMLOutput = `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Borrow Books</title>
    </head>
    <body>
        <div style="padding: 5px; margin: 1%; border-radius: 15px; background-color: gray;">
            <h1 style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: bold; text-align: center; border-radius: 15px; background-color: darkgray; margin: 10px 10px 10px 2px;">Search for Books</h1>
            <div style="padding-left: 20px; padding-right: 20px; padding-bottom: 20px; padding-top: 1px; margin: 1%; border-radius: 15px; background-color: lightgray;">
                <h2 style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; text-align: center;">Actions:</h2>
                <ui><a href="/List" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 10px; margin:1%; border-radius: 15px; background-color: darkgray; border: solid;" >List all Books</a></li>
                <ui><a href="/Return" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 10px; margin:1%; border-radius: 15px; background-color: darkgray; border: solid;" >Return a Book</a></li>  
                <ui><a href="/" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 10px; margin:1%; border-radius: 15px; background-color: darkgray; border: solid;" >Return to homepage</a></li>   
            </div>
            <div style= "padding: 20px; margin: 1%; border-radius: 15px; background-color: lightgray;"> 
                <form method="POST" action="/Borrow" style="display: flex; flex-direction: column; gap: 2px;">
                    <Label style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;" >Book Name:</Label>
                    <input style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;" type="text" placeholder="Enter Book Name Here" name="BorrowedBookName"/>
                    <label style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">Library Card Number:</label>
                    <input style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;" type="text" placeholder="Enter your Library Card Number Here" name="BorrowerLibraryCard"/>
                    <Button style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">Submit</Button>
                </form>
            </div>
        </div>
    </body>
</html>
`
const borrowedHTMLOutput1 = `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Borrow Books</title>
    </head>
    <body>
        <div style="padding: 5px; margin: 1%; border-radius: 15px; background-color: gray;">
            <h1 style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: bold; text-align: center; border-radius: 15px; background-color: darkgray; margin: 10px 10px 10px 2px;">Borrow Books</h1>
            <div style="padding-left: 20px; padding-right: 20px; padding-bottom: 20px; padding-top: 1px; margin: 1%; border-radius: 15px; background-color: lightgray;">
                <h2 style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; text-align: center;">Actions:</h2>
                <ui><a href="/List" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 10px; margin:1%; border-radius: 15px; background-color: darkgray; border: solid;" >List all Books</a></li>
                <ui><a href="/Return" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 10px; margin:1%; border-radius: 15px; background-color: darkgray; border: solid;" >Return a Book</a></li>  
                <ui><a href="/" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 10px; margin:1%; border-radius: 15px; background-color: darkgray; border: solid;" >Return to homepage</a></li>   
            </div>
            <div style= "padding: 20px; margin: 1%; border-radius: 15px; background-color: lightgray;"> 
                <form method="POST" action="/Borrow" style="display: flex; flex-direction: column; gap: 2px;">
                    <Label style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;" >Book Name:</Label>
                    <input style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;" type="text" placeholder="Enter Book Name Here" name="BorrowedBookName"/>
                    <label style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">Library Card Number:</label>
                    <input style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;" type="text" placeholder="Enter your Library Card Number Here" name="BorrowerLibraryCard"/>
                    <Button style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">Submit</Button>
                </form>
`
const borrowedHTMLOutput2 = `
</div>
</div>
</body>
</html>
`
const returnHTMLOutput1 = `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Return Books</title>
    </head>
    <body>
        <div style="padding: 5px; margin: 1%; border-radius: 15px; background-color: gray;">
            <h1 style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: bold; text-align: center; border-radius: 15px; background-color: darkgray; margin: 10px 10px 10px 2px;">Return Books</h1>
            <div style="padding-left: 20px; padding-right: 20px; padding-bottom: 20px; padding-top: 1px; margin: 1%; border-radius: 15px; background-color: lightgray;">
                <h2 style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; text-align: center;">Actions:</h2>
                <ui><a href="/List" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 10px; margin:1%; border-radius: 15px; background-color: darkgray; border: solid;" >List all Books</a></li>
                <ui><a href="/Borrow" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 10px; margin:1%; border-radius: 15px; background-color: darkgray; border: solid;" >Borrow a Book</a></li>  
                <ui><a href="/" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 10px; margin:1%; border-radius: 15px; background-color: darkgray; border: solid;" >Return to homepage</a></li>   
            </div>
            <div style= "padding: 20px; margin: 1%; border-radius: 15px; background-color: lightgray;"> 
                <form method="POST" action="/Return" style="display: flex; flex-direction: column; gap: 2px;">
                    <Label style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;" >Book Name:</Label>
                    <input style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;" type="text" placeholder="Enter Book Name Here" name="ReturnedBookName"/>
                    <label style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">Library Card Number:</label>
                    <input style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;" type="text" placeholder="Enter your Library Card Number Here" name="ReturnerLibraryCard"/>
                    <Button style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">Submit</Button>
                </form>
`
const returnHTMLOutput2 = `
            </div>
        </div>
    </body>
</html>
`

const displaybookHTMLOutput1 = `
<div style= "padding: 2px; margin: 1%; border-radius: 15px; background-color: lightgray;">
<h2 style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 20px;">Book Name:
`
const displaybookHTMLOutput2 = `
</h2>
<p style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 20px;">Author:
`
const displaybookHTMLOutput3 = `
</p>
<p style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 20px;">Status:
`
const displaybookHTMLOutput4 = `
</p>
<p style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 20px;">Borrowed By:
`
const displaybookHTMLOutput5 = `
</p>
</div>
`

app.get("/", (req, res) => {
    console.log("Request received at the / endpoint")
    return res.send(indexHTMLOutput)
});

let displaybooksHTMLOutput = `
`

app.get("/List", (req,res) => {
    console.log("Request received at the /List endpoint")
    const Results = []
    let currBooknum = 0
    let alldisplayedbooksHTMLOutput = ``
    for (let currBook of Books) {
        Results.push(currBook)
        const Bookname = JSON.stringify(Books[currBooknum].Book)
        const Bookauthor = JSON.stringify(Books[currBooknum].Author)
        let Bookavailable = ""
        let Borrower = ""
        if (Books[currBooknum].Available === true) {
            Bookavailable = "Available"
            Borrower = "N/A"
        } else {
            Bookavailable = "Not Available"
            Borrower = Books[currBooknum].Borrower
        } 
        currBooknum += 1
        displaybooksHTMLOutput = displaybookHTMLOutput1 + Bookname + displaybookHTMLOutput2 + Bookauthor + displaybookHTMLOutput3 + Bookavailable + displaybookHTMLOutput4 + Borrower + displaybookHTMLOutput5
        alldisplayedbooksHTMLOutput += displaybooksHTMLOutput
    }
    return res.send(listHTMLOutput1 + alldisplayedbooksHTMLOutput + listHTMLOutput2)
})

app.get("/Borrow", (req,res) => {
    console.log("Request received at the /Borrow endpoint")
    return res.send(borrowHTMLOutput)
})

app.post("/Borrow", (req,res) => {
    console.log("Post Request Received - Borrowing a Book")
    let borrowingbookname = ""
    let borrowingid = ""
    borrowingbookname = JSON.stringify(req.body.BorrowedBookName)
    borrowingid = parseInt(req.body.BorrowerLibraryCard)
    const Results = []
    let currBooknum = 0
    for (let currBook of Books) {
        Results.push(currBook)
        const Bookname = JSON.stringify(Books[currBooknum].Book)
        if (borrowingbookname === Bookname && Books[currBooknum].Available === true) {
            Books[currBooknum].Available = false
            Books[currBooknum].Borrower = borrowingid
            console.log(Books[currBooknum].Book + " is Available")
            const borrowsuccessmessage = `<p> ${borrowingbookname} has successfully been borrowed by User ${borrowingid}`
            return res.send(borrowedHTMLOutput1 + borrowsuccessmessage + borrowedHTMLOutput2)
        } 
        else if (borrowingbookname === Bookname && borrowingid === Books[currBooknum].Borrower) {
            return res.send(borrowedHTMLOutput1 + `<p> You have already borrowed this book. </p>` + borrowedHTMLOutput2)
        } 
        else if (borrowingbookname === Bookname && Books[currBooknum].Available === false && borrowingid != Books[currBooknum].Borrower ) { 
            const alreadyborrowedmessage = `<p> ${borrowingbookname} has already been borrowed by User ${Books[currBooknum].Borrower} </p>`
            return res.send(borrowedHTMLOutput1 + alreadyborrowedmessage + borrowedHTMLOutput2)
        }
        else if(borrowingbookname !== Bookname){
            currBooknum += 1
            if (currBooknum >= NumofBooks) {
           const errormessage = `<p> ${borrowingbookname} could not be found.</p>`
           return res.send(borrowedHTMLOutput1 + errormessage + borrowedHTMLOutput2)
            }
        }

    }
})

app.get("/Return", (req,res) => {
 return res.send (returnHTMLOutput1 + returnHTMLOutput2)
})

app.post("/Return", (req,res) => {
    console.log("Post Request Received - Returning a Book")
    let returningbookname = ""
    let returnid = ""
    returningbookname = JSON.stringify(req.body.ReturnedBookName)
    returnid = parseInt(req.body.ReturnerLibraryCard)
    const Results = []
    let currBooknum = 0
    for (let currBook of Books) {
        Results.push(currBook)
        const Bookname = JSON.stringify(Books[currBooknum].Book)
        if (returningbookname === Bookname && Books[currBooknum].Available === false && returnid === Books[currBooknum].Borrower ) {
        Books[currBooknum].Available = true
        Books[currBooknum].Borrower = ""
        console.log(Books[currBooknum].Book + "Has been Returned")
        const returnsuccessmessage = `<p> ${returningbookname} has been successfully returned by ${returnid} </p>`    
        return res.send(returnHTMLOutput1 + returnsuccessmessage + returnHTMLOutput2)
    } else if (returningbookname === Bookname && Books[currBooknum].Available === false && returnid != Books[currBooknum].Borrower ) { 
        const returnerrormessage = `<p> ${returningbookname} was not borrowed by User ${returnid}`
        return res.send(returnHTMLOutput1 + returnerrormessage + returnHTMLOutput2 )
    }
    else {
    currBooknum += 1
    }
}})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    console.log(`use ctrl + c in terminal to stop me`)
 });
 