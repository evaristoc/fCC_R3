# Fccr3

The tentative name of this project is FreeCodeCamp (fCC) Community Resources Review. Although it borrows the name from fCC as source of inspiration and origin, this project is NOT currently in direct connection with the organization (www.freecodecamp.org).

## Description

The project mission is to offer users, in principle new developers, a curated list of relevant resources to learn programming.

This project is a Proof of Concept.

The resources (`platforms`) are relevant urls about online content mentioned by fCC social media users. The main sources from where the data is being currently extracted are fCC chatrooms. Specific information about each platform is extracted either from fCC chatrooms, the platform itself or other sources when required. The platforms also receive a `category` that allows to distinguish the platform's main mission. 

Data about platforms is presented in a searchable list format ordered according to its relevance when compared to the different `subjects` or topics of the fCC curriculum as in the current beta version of the fCC website (https://beta.freecodecamp.com/en/map).

The project allows different kind of comparisons between the shown platforms as well as some useful data of interest at platform level.

This project is being managed using a Kanban methodology (https://realtimeboard.com/blog/choose-between-agile-lean-scrum-kanban/#.WW5nlh9Nybk). This repository of the project shows the advances of the frontend work. There exists another repository to shows some of the advances in data mining, analysis and machine learning.

## Installation

Currently the project is not deployed but it is possible to get a first view in your local browser if you have the requirements.

This section of the project is done using [node.js](https://nodejs.org/en/) and [Angular](https://angular.io/). We rely on node.js' npm and [angular-cli 1.2.0](https://github.com/angular/angular-cli) as main installation tools.

The project is also been created under *UNIX operating systems*.

To have a look of how the project looks in the browser you might require to have node.js installed, and then possibly angular-cli.

Having those requirements, and assuming you also share a UNIX operating system and navigate using a shell,
* clone and extract this repository
* move to your newly created directory
* once inside the directory, run `npm install`
* if you have angular-cli installed, run `ng serve` and navigate through the address `http//:localhost:4200` on your browser

## Related projects

For more information about the associated advances in data mining, analysis and machine learning, please visit this repository: https://github.com/evaristoc/fCC_R3_DataAnalysis (currently under construction)
