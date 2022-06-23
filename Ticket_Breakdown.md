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

### 1. Add new colum `FacilityToCustomIdMap` to `Agents` table
### 2. Add new API endpoint to update `FacilityToCustomIdMap` when a Facility submits a custom id for an agent
### 3. Add new API endpoint to get CustomId assigned to an agent by a Facility
### 4. Modify `generateReport` function call, to accept facility's id and get `CustomId` using `getCustomId` api endpoint 
### 5. Modify `generateReport` function body, to print `CustomId` in place of `AgentId` in the pdf

Details
--

### 1. Add new colum `FacilityToCustomIdMap` to `Agents` table

#### Why

An agent may have different customid assigned to it by different facilities.
Object map seems apt choice to store such key-value pairs where Facility id is mapped
to the custom id assigned by it.
Later on we could use this `FacilityToCustomIdMap` to replace the `AgentId` (internal database id) with custom id
when printing pdf for a facility.

#### What

Add a new colum or table field to `Agents` table - `FacilityToCustomIdMap` having custom type of object.

#### Time estimate - 30 mins
#### Acceptance criteria 
- `FacilityToCustomIdMap` should be present in Agents table with default value null.
- Type of `FacilityToCustomIdMap` should be Object type to store key value pairs.


### 2. Add new API endpoint to update `FacilityToCustomIdMap` when a Facility submits a custom id for an agent

#### Why

To allow a Facility to store custom id against an agent.

#### What

Add a new function `storeCustomId` which takes `agentId`, `customId`, `facilityId` as argument. It updates the row matching the agentId, in Agents table by adding object value { `facilityId`:`customId` } in the `FacilityToCustomIdMap` field.

Expose this function `storeCustomId` over api endpoint which authenticated using existing security techniques like Bearer token from Outh.

#### Time estimate - 4 hours
#### Acceptance criteria 
- `storeCustomId` api endpoint should be available with authentication support.
- Call to `storeCustomId` updates `FacilityToCustomIdMap` successfully.
- Call to `storeCustomId` updates `FacilityToCustomIdMap` shouldn't delete existing object if it exists, but add new key value pair in it.

### 3. Add new API endpoint to get CustomId assigned to an agent by a Facility

#### Why

CustomId is needed to print in report pdf , so we need a way to retrieve it.

#### What

Add a new function `getCustomId` which takes `agentId`, `facilityId` as argument and it returns `customId`.
Expose this function `getCustomId` over api endpoint which authenticated using existing security techniques like Bearer token from Outh.

#### Time estimate - 3 hours
#### Acceptance criteria 
- `getCustomId` api endpoint should be available with authentication support
- Call to `getCustomId` returns `customId` for a valid `agentId` and `facilityId`

### 4. Modify `generateReport` function call, to accept facility's id and get `CustomId` using `getCustomId` api endpoint 

#### Why

While `generateReport` we need facility's id to find corresponding CustomId from `FacilityToCustomIdMap` colum of the agent table.

#### What

Wherever `generateReport` function is called , update it to include facility's id as an argument to it.
In its body, get custom id assigned to the agent using `getCustomId` api endpoint.

#### Time estimate - 2 hours
#### Acceptance criteria 
- `generateReport` should accept facility's id

### 5. Modify `generateReport` function body, to print `CustomId` in place of `AgentId` in the pdf

#### Why

Since in the report pdf we need to show CustomId of agent, we need to modify `generateReport` function where the print function is called.

#### What

When the print function is called inside `generateReport` function, we need to replace the agent id passed to it, with the custom id of the agent. 

#### Time estimate - 2 hours
#### Acceptance criteria 
- `generateReport` should print custom id of agent in its pdf report.




