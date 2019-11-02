# Train-Time

I built out my html first, only creating the jumbotron, the tbody (for the submitted train schedule) and then a form for user input. 

Once the user hit submit, i stored the input in variables and applied validation.
    1. using regex (with the help of my tutor), i made sure user input matched my desired input
    2. i made sure no fields were empty
    3. i made sure the frequency was a number

    if these werent the required inputs, i created messages to pop up to alert the user.

I pushed the data to my firebase and then listened for any changes within the database, using the "child_added" method. If there was, I'd run a function. 

The function checked and appended information to the table, creating objects (elements). 

Then, a set internal would run a timer which would refresh the data every minute.