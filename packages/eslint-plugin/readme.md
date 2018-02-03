# eslint-plugin-iot-course

eslint lint rules for the Scalable IoT course

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-iot-course`:

```
$ npm install eslint-plugin-iot-course --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-iot-course` globally.

## Usage

Add `iot-course` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "iot-course"
    ]
}``
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "iot-course/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here
