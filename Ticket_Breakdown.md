# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Ticket 1 - Create agent_custom_ids table
**User Story**: As a Facility, I want to add a custom id for each Agent so that I can use that Id when generating reports for an Agent.

**AC**

* Create an `agent_custom_ids` table with the following columns
    * id - primaryKey
    * facility_id - foreignKey(Facilities_table, id)
    * agent_id - foreignKey(Agents_table, id)
    * custom_id - unique

**Estimation** - 2 points

### Ticket 2 - Assign customId to an Agent
**User Story**: As a Facility, I want to add a customId for each Agent so that I can use that Id when generating reports for an Agent.

**AC**

Given:
* I'm authenticated as a Facility

When:
* I send a request to update Agent details with customId

Then:
* The customId is assigned to the Agent

**Tech Notes**

* The new custom id should be added in the `agent_custom_ids` table
* Use the existing endpoint for updating the Agent details

**Estimation** - 3 points

### Ticket 3 - Provide cutomId field on the Agent detail view page

**User Story**: As a Facility, I want to add a custom id for each Agent so that I can use that Id when generating reports for an Agent.

**AC**

Given:

* I'm authenticated as a Facility
* I'm on the Agent detail view page
* I'm in Edit mode

When:

* I provide a custom id for the Agent
* I click on the Update button

Then:

* I see the updated custom id in the Agent detail view page in View mode

**Estimation** - 2 points

### Ticket 4 - Include customId to Agent metadata that is returned with Shifts

**User Story**: As a Facility, I want to add a custom id for each Agent so that I can use that Id when generating reports for an Agent.

**AC**

Given:

* I'm authenticated as a Facility

When:

* I trigger the `getShiftsByFacility` function

Then:

* I get all Shifts worked that quarter, including the metadata about the assigned Agent with their custom id

**Tech Notes**

* Each Shift has the Fasility and Agent id in their records. Use these to get custom ids for agents from the `agent_custom_ids` table

**Estimation** - 2 points

### Ticket 5 - Include Agent customId in the PDF record

**User Story**: As a Facility, I want to add a custom id for each Agent so that I can use that Id when generating reports for an Agent.

**AC**

Given:

* I'm authenticated as a Facility

When:

* I generate reports

Then:

* I get the Shifts converted into a PDF that includes Agents customId

**Estimation** - 2 points

I did estimations based on Fibonacci numbers assuming that 1 point is a simple change such as updating a text. 2 points are a bit more complicated than 1 point. It includes creating something small or updating small details in existing functionality. The other points increase similarly based on the complexity.