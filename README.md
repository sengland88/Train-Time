# Train-Time

<h2>Project Name</h2>

Train Time

<h2>Concept</h2>

A web application for kidding track of training within a system. 

<h2>Project Overview</h2>

A computer and mobile-friendly web application that allows users to track train schedules The user provides the name, destination, the first train time (in military time) and the frequency. When the user hits submit, the information is immediately stored/retrieved in/from a cloud-based server. The JavaScript will append it to a schedule and will calculate the next arrival time and how many minutes  away the next train is. This table also updates every 60 seconds so the user can see in real-time how many minutes left.

<h2>Process</h2>

I built out my html first, only creating the jumbotron, the tbody (for the submitted train schedule) and then a form for user input. 

Once the user hit submit, i stored the input in variables and applied validation.
    1. using regex (with the help of my tutor), i made sure user input matched my desired input
    2. i made sure no fields were empty
    3. i made sure the frequency was a number

    if these werent the required inputs, i created messages to pop up to alert the user.

I pushed the data to my firebase and then listened for any changes within the database, using the "child_added" method. If there was, I'd run a function. 

The function checked and appended information to the table, creating objects (elements). 

Then, a set internal would run a timer which would refresh the data every minute.
