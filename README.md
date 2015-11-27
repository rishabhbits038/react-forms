# react-forms
A simple react project to create forms from a json. Specify the mandatory fields, regular expressions, multi select fields from the json itself. 

[Live Demo](http://rishabhbits038.github.io/react-forms/)

Check the console for output.

# Sample Json:

  "data": [
    {
      "label": "Name",
      "elementId": "name",
      "type": "SmartInput",
      "value": "",
      "mandatory": true,
      "regex": ""
    },
    {
      "label": "Email",
      "elementId": "email",
      "type": "SmartInput",
      "mandatory": true,
      "regex": "^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$"
    },
    {
      "label": "Department",
      "elementId": "department",
      "type": "SmartDropDownSelect",
      "value": [
        "Computer Science",
        "Electrical",
        "Mechanical",
        "Chemical"
      ],
      "mandatory": false,
      "multiSelect": false,
      "regex": ""
    },
    {
      "label": "Grade",
      "elementId": "grade",
      "type": "SmartDropDownSelect",
      "value": [
        {
          "10": "A"
        },
        {
          "9": "A-"
        },
        {
          "8": "B"
        },
        {
          "7": "B-"
        }
      ],
      "mandatory": false,
      "multiSelect": false,
      "regex": ""
    },
    {
      "label": "Month",
      "elementId": "month",
      "type": "SmartDropDownSelect",
      "value": [
        "January",
        "February",
        "March",
        "April",
        "May"
      ],
      "mandatory": false,
      "multiSelect": true,
      "regex": ""
    },
    {
      "label": "Green",
      "elementId": "Green",
      "type": "SmartCheckbox",
      "value": false
    },
    {
      "label": "Red",
      "elementId": "Red",
      "type": "SmartCheckbox",
      "value": false
    },
    {
      "label": "Blue",
      "elementId": "Blue",
      "type": "SmartCheckbox",
      "value": false
    },
    {
      "label": "Radio Buttons",
      "elementId": "RadioButton",
      "type": "SmartRadio",
      "value": [
        {
           "1": "one"
        },
        {
           "2":"two"
        },
        {
            "3":"three"
        }
      ]
    },
    {
      "label": "Browse",
      "elementId": "Browse",
      "type": "SmartFileInput",
      "mandatory": false,
      "multiSelect": false,
      "theme": "grey"
    },
    {
      "label": "Submit",
      "elementId": "Submit",
      "type": "SmartButton",
      "theme": "blue"
    }
  ]
}



# Setup

Clone this repo: git clone https://github.com/rishabhbits038/react-forms.git
Run npm install.
Install webpack globally: npm install webpack -g.

# Run

1. Run `npm start` in one terminal window.
2. Run `webpack -w` in another terminal window.

# Browser

- Open [http://localhost:3000](http://localhost:3000) and start developing!
