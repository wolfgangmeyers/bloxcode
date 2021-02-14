// define custom blocks
Blockly.Blocks['instance_find_first_child'] = {
    init: function () {
        this.appendValueInput("NAME")
            .setCheck("String")
            .appendField("find first child of")
            .appendField(new Blockly.FieldVariable("workspace"), "INSTANCE")
            .appendField("named");
        this.setOutput(true, "Instance");
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['instance_find_first_child'] = function (block) {
    var variable_instance = Blockly.Lua.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    var value_name = Blockly.Lua.valueToCode(block, 'NAME', Blockly.Lua.ORDER_ATOMIC);
    var code = `${variable_instance}:FindFirstChild(${value_name})`;
    return [code, Blockly.Lua.ORDER_NONE];
};

Blockly.Blocks['instance_is_a'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("is")
            .appendField(new Blockly.FieldVariable("item"), "INSTANCE")
            .appendField("a")
            .appendField(new Blockly.FieldTextInput("Part"), "TYPE");
        this.setOutput(true, "Boolean");
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['instance_is_a_part'] = function (block) {
    var variable_instance = Blockly.Lua.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    // TODO: Assemble Lua into code variable.
    var code = `${variable_instance}:isA("Part")`;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Lua.ORDER_NONE];
};

Blockly.Lua['instance_is_a'] = function (block) {
    var variable_instance = Blockly.Lua.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    var text_type = block.getFieldValue('TYPE');
    // TODO: Assemble Lua into code variable.
    var code = `${variable_instance}:isA("${text_type}")`;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Lua.ORDER_NONE];
};

Blockly.Blocks['part_set_brickcolor'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("set brick color")
            .appendField(new Blockly.FieldVariable("item"), "INSTANCE")
            .appendField("R")
            .appendField(new Blockly.FieldNumber(0, 0, 1), "R")
            .appendField("G")
            .appendField(new Blockly.FieldNumber(0, 0, 1), "G")
            .appendField("B")
            .appendField(new Blockly.FieldNumber(0, 0, 1), "B");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['part_set_brickcolor'] = function (block) {
    var variable_instance = Blockly.Lua.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    var number_r = block.getFieldValue('R');
    var number_g = block.getFieldValue('G');
    var number_b = block.getFieldValue('B');
    var code = `${variable_instance}.BrickColor = BrickColor.new(${number_r}, ${number_g}, ${number_b})\n`;
    return code;
};

Blockly.Blocks['wait'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("wait")
            .appendField(new Blockly.FieldNumber(0, 0), "AMOUNT");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['wait'] = function (block) {
    var number_amount = block.getFieldValue('AMOUNT');
    var code = `wait(${number_amount})\n`;
    return code;
};

Blockly.Blocks['instance_destroy'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Instance:destroy")
            .appendField(new Blockly.FieldVariable("item"), "INSTANCE");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
}

Blockly.Lua['instance_destroy'] = function (block) {
    var variable_instance = Blockly.Lua.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    var code = `${variable_instance}:Destroy()\n`
    return code;
};

Blockly.Blocks['instance_wait_for_child'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("wait for child")
            .appendField(new Blockly.FieldVariable("workspace"), "INSTANCE");
        this.appendValueInput("NAME")
            .setCheck("String")
            .appendField("name");
        this.appendDummyInput()
            .appendField("timeout")
            .appendField(new Blockly.FieldNumber(1), "TIMEOUT");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['instance_wait_for_child'] = function (block) {
    var variable_instance = Blockly.Lua.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    var value_name = Blockly.Lua.valueToCode(block, 'NAME', Blockly.Lua.ORDER_ATOMIC);
    var number_timeout = block.getFieldValue('TIMEOUT');
    var code = `${variable_instance}:WaitForChild(${value_name}, ${number_timeout})\n`;
    return code;
};

Blockly.Blocks['instance_get_parent'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("get parent of")
            .appendField(new Blockly.FieldVariable("instance"), "INSTANCE");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['instance_get_parent'] = function (block) {
    var variable_instance = Blockly.Lua.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    // TODO: Assemble Lua into code variable.
    var code = `${variable_instance}.Parent`;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Lua.ORDER_NONE];
};

Blockly.Blocks['part_event_connect'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("part connect event")
            .appendField(new Blockly.FieldVariable("item"), "INSTANCE")
            .appendField(new Blockly.FieldDropdown([
                ["Touched", "Touched"]
            ]), "EVENT")
            .appendField(new Blockly.FieldVariable("arg"), "ARG");
        this.appendStatementInput("NAME")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['part_event_connect'] = function (block) {
    var variable_instance = Blockly.Lua.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    var dropdown_event = block.getFieldValue('EVENT');
    var variable_arg = Blockly.Lua.variableDB_.getName(block.getFieldValue('ARG'), Blockly.Variables.NAME_TYPE);
    var statements_name = Blockly.Lua.statementToCode(block, 'NAME');
    // TODO: Assemble JavaScript into code variable.
    var code = `${variable_instance}.${dropdown_event}:Connect(function(${variable_arg})
${statements_name}
end)\n`;
    return code;
};

Blockly.Blocks['set_local_variable'] = {
    init: function () {
        this.appendValueInput("VALUE")
            .setCheck(null)
            .appendField("set local")
            .appendField(new Blockly.FieldVariable("item"), "VARIABLE")
            .appendField("to");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['set_local_variable'] = function (block) {
    var variable_variable = Blockly.Lua.variableDB_.getName(block.getFieldValue('VARIABLE'), Blockly.Variables.NAME_TYPE);
    var value_value = Blockly.Lua.valueToCode(block, 'VALUE', Blockly.Lua.ORDER_ATOMIC);
    var code = `local ${variable_variable} = ${value_value}\n`;
    return code;
};