// define custom blocks
Blockly.Blocks['instance_find_first_child'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("find first child")
            .appendField(new Blockly.FieldVariable("workspace"), "INSTANCE")
            .appendField(new Blockly.FieldTextInput("<name>"), "NAME");
        this.setOutput(true, "Instance");
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['instance_find_first_child'] = function(block) {
    var variable_instance = Blockly.Lua.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    var text_name = block.getFieldValue('NAME');
    // TODO: Assemble Lua into code variable.
    var code = `${variable_instance}:FindFirstChild("${text_name}")`;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Lua.ORDER_NONE];
};

Blockly.Blocks['instance_is_a_part'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("is a Part")
            .appendField(new Blockly.FieldVariable("workspace"), "INSTANCE");
        this.setOutput(true, "Boolean");
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
}

Blockly.Lua['instance_is_a_part'] = function(block) {
    var variable_instance = Blockly.Lua.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    // TODO: Assemble Lua into code variable.
    var code = `${variable_instance}:isA("Part")`;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Lua.ORDER_NONE];
};

Blockly.Blocks['part_set_brickcolor'] = {
    init: function() {
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

Blockly.Lua['part_set_brickcolor'] = function(block) {
    var variable_instance = Blockly.Lua.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    var number_r = block.getFieldValue('R');
    var number_g = block.getFieldValue('G');
    var number_b = block.getFieldValue('B');
    var code = `${variable_instance}.BrickColor = BrickColor.new(${number_r}, ${number_g}, ${number_b})\n`;
    return code;
};

Blockly.Blocks['wait'] = {
    init: function() {
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

Blockly.Lua['wait'] = function(block) {
    var number_amount = block.getFieldValue('AMOUNT');
    var code = `wait(${number_amount})\n`;
    return code;
};

Blockly.Blocks['instance_destroy'] = {
    init: function() {
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

Blockly.Lua['instance_destroy'] = function(block) {
    var variable_instance = Blockly.Lua.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    var code = `${variable_instance}:Destroy()\n`
    return code;
};

Blockly.Blocks['instance_wait_for_child'] = {
    init: function() {
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

Blockly.Lua['instance_wait_for_child'] = function(block) {
    var variable_instance = Blockly.Lua.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    var value_name = Blockly.Lua.valueToCode(block, 'NAME', Blockly.Lua.ORDER_ATOMIC);
    var number_timeout = block.getFieldValue('TIMEOUT');
    var code = `${variable_instance}:WaitForChild(${value_name}, ${number_timeout})\n`;
    return code;
};

Blockly.Blocks['part_event_connect'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("part connect event")
            .appendField(new Blockly.FieldVariable("item"), "INSTANCE")
            .appendField(new Blockly.FieldDropdown([
                ["Touched", "Touched"]
            ]), "EVENT");
        this.appendStatementInput("NAME")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['part_event_connect'] = function(block) {
    var variable_instance = Blockly.Lua.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    var dropdown_event = block.getFieldValue('EVENT');
    var statements_name = Blockly.Lua.statementToCode(block, 'NAME');
    var code = `${variable_instance}.${dropdown_event}:Connect(function()
${statements_name}
end)\n`;
    return code;
};