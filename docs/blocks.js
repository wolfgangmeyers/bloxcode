// define custom blocks
Blockly.Blocks['instance_find_first_child'] = {
    init: function() {
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

Blockly.Lua['instance_find_first_child'] = function(block) {
    var variable_instance = Blockly.Lua.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    var value_name = Blockly.Lua.valueToCode(block, 'NAME', Blockly.Lua.ORDER_ATOMIC);
    var code = `${variable_instance}:FindFirstChild(${value_name})`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};

Blockly.Blocks['instance_is_a'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("is")
            .appendField(new Blockly.FieldVariable("instance"), "INSTANCE")
            .appendField("a")
            .appendField(new Blockly.FieldDropdown([
                ["Part", "Part"],
                ["Humanoid", "Humanoid"]
            ]), "TYPE");
        this.setOutput(true, "Boolean");
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['instance_is_a'] = function(block) {
    var variable_instance = Blockly.Lua.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    var dropdown_type = block.getFieldValue('TYPE');
    var code = `${variable_instance}:isA("${dropdown_type}")`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};

Blockly.Blocks['instance_new'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("create new instance of type")
            .appendField(new Blockly.FieldDropdown([
                ["BodyGyro", "BodyGyro"],
                ["BodyPosition", "BodyPosition"]
            ]), "TYPE");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['instance_new'] = function(block) {
    var dropdown_type = block.getFieldValue('TYPE');
    var code = `Instance.new("${dropdown_type}")`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};

Blockly.Blocks['instance_new_with_parent'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("create new instance of type")
            .appendField(new Blockly.FieldDropdown([
                ["BodyGyro", "BodyGyro"],
                ["BodyPosition", "BodyPosition"]
            ]), "TYPE")
            .appendField("with parent")
            .appendField(new Blockly.FieldVariable("instance"), "INSTANCE");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['instance_new_with_parent'] = function(block) {
    var dropdown_type = block.getFieldValue('TYPE');
    var variable_instance = Blockly.Lua.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    var code = `Instance.new("${dropdown_type}", ${variable_instance})`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
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

Blockly.Blocks['part_get_position'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("get position of")
            .appendField(new Blockly.FieldVariable("part"), "PART");
        this.setOutput(true, "Vector3");
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['part_get_position'] = function(block) {
    var variable_part = Blockly.Lua.variableDB_.getName(block.getFieldValue('PART'), Blockly.Variables.NAME_TYPE);
    var code = `${variable_part}.Position`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};

Blockly.Blocks['part_set_position'] = {
    init: function() {
        this.appendValueInput("POSITION")
            .setCheck("Vector3")
            .appendField("set position of")
            .appendField(new Blockly.FieldVariable("part"), "PART")
            .appendField("to");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['part_set_position'] = function(block) {
    var variable_part = Blockly.Lua.variableDB_.getName(block.getFieldValue('PART'), Blockly.Variables.NAME_TYPE);
    var value_position = Blockly.Lua.valueToCode(block, 'POSITION', Blockly.Lua.ORDER_ATOMIC);
    var code = `${variable_part}.Position = ${value_position}\n`;
    return code;
};

Blockly.Blocks['part_get_cframe'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("get CFrame of")
            .appendField(new Blockly.FieldVariable("part"), "PART");
        this.setOutput(true, "CFrame");
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['part_get_cframe'] = function(block) {
    var variable_part = Blockly.Lua.variableDB_.getName(block.getFieldValue('PART'), Blockly.Variables.NAME_TYPE);
    var code = `${variable_part}.CFrame`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};

Blockly.Blocks['part_set_cframe'] = {
    init: function() {
        this.appendValueInput("VALUE")
            .setCheck("CFrame")
            .appendField("set CFrame of")
            .appendField(new Blockly.FieldVariable("part"), "PART")
            .appendField("to");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['part_set_cframe'] = function(block) {
    var variable_part = Blockly.Lua.variableDB_.getName(block.getFieldValue('PART'), Blockly.Variables.NAME_TYPE);
    var value_value = Blockly.Lua.valueToCode(block, 'VALUE', Blockly.Lua.ORDER_ATOMIC);
    var code = `${variable_part}.CFrame = ${value_value}\n`;
    return code;
};

Blockly.Blocks['bodyposition_set_p'] = {
    init: function() {
        this.appendValueInput("NAME")
            .setCheck("Number")
            .appendField("set P of")
            .appendField(new Blockly.FieldVariable("pos"), "POS")
            .appendField("to");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['bodyposition_set_p'] = function(block) {
    var variable_pos = Blockly.Lua.variableDB_.getName(block.getFieldValue('POS'), Blockly.Variables.NAME_TYPE);
    var value_name = Blockly.Lua.valueToCode(block, 'NAME', Blockly.Lua.ORDER_ATOMIC);
    var code = `${variable_pos}.P = ${value_name}\n`;
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

Blockly.Blocks['spawn_thread'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("spawn thread");
        this.appendStatementInput("FUNCTION")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['spawn_thread'] = function(block) {
    var statements_function = Blockly.Lua.statementToCode(block, 'FUNCTION');
    var code = `spawn(function()
    ${statements_function}
    end)\n`;
    return code;
};

Blockly.Blocks['instance_destroy'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("destroy")
            .appendField(new Blockly.FieldVariable("instance"), "INSTANCE");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

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
            .appendField("named");
        this.appendDummyInput()
            .appendField("timeout")
            .appendField(new Blockly.FieldNumber(1), "TIMEOUT");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
}

Blockly.Lua['instance_wait_for_child'] = function(block) {
    var variable_instance = Blockly.Lua.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    var value_name = Blockly.Lua.valueToCode(block, 'NAME', Blockly.Lua.ORDER_ATOMIC);
    var number_timeout = block.getFieldValue('TIMEOUT');
    var code = `${variable_instance}:WaitForChild(${value_name}, ${number_timeout})\n`;
    return code;
};
Blockly.Blocks['instance_get_attribute'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("get")
            .appendField(new Blockly.FieldDropdown([
                ["Parent", "Parent"],
                ["Name", "Name"],
                ["Archivable", "Archivable"]
            ]), "ATTRIBUTE")
            .appendField("of")
            .appendField(new Blockly.FieldVariable("instance"), "INSTANCE");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['instance_get_attribute'] = function(block) {
    var dropdown_attribute = block.getFieldValue('ATTRIBUTE');
    var variable_instance = Blockly.Lua.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    var code = `${variable_instance}.${dropdown_attribute}`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};

Blockly.Blocks['instance_set_attribute'] = {
    init: function() {
        this.appendValueInput("VALUE")
            .setCheck(null)
            .appendField("set")
            .appendField(new Blockly.FieldDropdown([
                ["Parent", "Parent"],
                ["Name", "Name"],
                ["Archivable", "Archivable"]
            ]), "ATTRIBUTE")
            .appendField("of")
            .appendField(new Blockly.FieldVariable("instance"), "INSTANCE")
            .appendField("to");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['instance_set_attribute'] = function(block) {
    var dropdown_attribute = block.getFieldValue('ATTRIBUTE');
    var variable_instance = Blockly.Lua.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    var value_value = Blockly.Lua.valueToCode(block, 'VALUE', Blockly.Lua.ORDER_ATOMIC);
    var code = `${variable_instance}.${dropdown_attribute} = ${value_value}\n`;
    return code;
};

Blockly.Blocks['instance_clone'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("make a clone of")
            .appendField(new Blockly.FieldVariable("instance"), "INSTANCE");
        this.setOutput(true, "Instance");
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['instance_clone'] = function(block) {
    var variable_instance = Blockly.Lua.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    var code = `${variable_instance}:Clone()`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};

Blockly.Blocks['instance_get_archivable'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("is")
            .appendField(new Blockly.FieldVariable("instance"), "INSTANCE")
            .appendField("archivable");
        this.setOutput(true, "Boolean");
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['instance_get_archivable'] = function(block) {
    var variable_instance = Blockly.Lua.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    var code = `${variable_instance}.Archivable`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};

Blockly.Blocks['instance_set_archivable'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("set")
            .appendField(new Blockly.FieldVariable("instance"), "INSTANCE")
            .appendField("archivable to");
        this.appendValueInput("VALUE")
            .setCheck("Boolean");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['instance_set_archivable'] = function(block) {
    var variable_instance = Blockly.Lua.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    var value_value = Blockly.Lua.valueToCode(block, 'VALUE', Blockly.Lua.ORDER_ATOMIC);
    var code = `${variable_instance}.Archivable = ${value_value}\n`;
    return code;
};

Blockly.Blocks['part_event_connect'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("on event")
            .appendField(new Blockly.FieldDropdown([
                ["Touched", "Touched"]
            ]), "EVENT")
            .appendField("of")
            .appendField(new Blockly.FieldVariable("item"), "INSTANCE")
            .appendField("with")
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

Blockly.Lua['part_event_connect'] = function(block) {
    var variable_instance = Blockly.Lua.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    var dropdown_event = block.getFieldValue('EVENT');
    var variable_arg = Blockly.Lua.variableDB_.getName(block.getFieldValue('ARG'), Blockly.Variables.NAME_TYPE);
    var statements_name = Blockly.Lua.statementToCode(block, 'NAME');
    var code = `${variable_instance}.${dropdown_event}:Connect(function(${variable_arg})
${statements_name}
end)\n`;
    return code;
};

Blockly.Blocks['set_local_variable'] = {
    init: function() {
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

Blockly.Lua['set_local_variable'] = function(block) {
    var variable_variable = Blockly.Lua.variableDB_.getName(block.getFieldValue('VARIABLE'), Blockly.Variables.NAME_TYPE);
    var value_value = Blockly.Lua.valueToCode(block, 'VALUE', Blockly.Lua.ORDER_ATOMIC);
    var code = `local ${variable_variable} = ${value_value}\n`;
    return code;
};

Blockly.Blocks['humanoid_set_scale'] = {
    init: function() {
        this.appendValueInput("NAME")
            .setCheck("Number")
            .appendField("set")
            .appendField(new Blockly.FieldDropdown([
                ["head", "Head"],
                ["body width", "BodyWidth"],
                ["body height", "BodyHeight"],
                ["body_depth", "BodyDepth"]
            ]), "BODYPART")
            .appendField("scale of")
            .appendField(new Blockly.FieldVariable("humanoid"), "HUMANOID")
            .appendField("to");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};


Blockly.Lua['humanoid_set_scale'] = function(block) {
    var dropdown_bodypart = block.getFieldValue('BODYPART');
    var variable_humanoid = Blockly.Lua.variableDB_.getName(block.getFieldValue('HUMANOID'), Blockly.Variables.NAME_TYPE);
    var value_name = Blockly.Lua.valueToCode(block, 'NAME', Blockly.Lua.ORDER_ATOMIC);
    var code = `${variable_humanoid}.${dropdown_bodypart}Scale.Value = ${value_name}\n`
    return code;
};

Blockly.Blocks['humanoid_get_scale'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("get")
            .appendField(new Blockly.FieldDropdown([
                ["head", "Head"],
                ["body width", "BodyWidth"],
                ["body height", "BodyHeight"],
                ["body depth", "BodyDepth"]
            ]), "BODYPART")
            .appendField("scale of")
            .appendField(new Blockly.FieldVariable("humanoid"), "HUMANOID");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['humanoid_get_scale'] = function(block) {
    var dropdown_bodypart = block.getFieldValue('BODYPART');
    var variable_humanoid = Blockly.Lua.variableDB_.getName(block.getFieldValue('HUMANOID'), Blockly.Variables.NAME_TYPE);
    var code = `${variable_humanoid}.${dropdown_bodypart}Scale.Value`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};


Blockly.Blocks['humanoid_get_attribute'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("get")
            .appendField(new Blockly.FieldDropdown([
                ["AutoJumpEnabled", "AutoJumpEnabled"],
                ["AutoRotate", "AutoRotate"],
                ["AutomaticScalingEnabled", "AutomaticScalingEnabled"],
                ["BreakJointsOnDeath", "BreakJointsOnDeath"],
                ["CameraOffset", "CameraOffset"],
                ["CollisionType", "CollisionType"],
                ["DisplayDistanceType", "DisplayDistanceType"],
                ["DisplayName", "DisplayName"],
                ["FloorMaterial", "FloorMaterial"],
                ["Health", "Health"],
                ["HealthDisplayDistance", "HealthDisplayDistance"],
                ["HealthDisplayType", "HealthDisplayType"],
                ["HipHeight", "HipHeight"],
                ["Jump", "Jump"],
                ["JumpHeight", "JumpHeight"],
                ["JumpPower", "JumpPower"],
                ["MaxHealth", "MaxHealth"],
                ["MaxSlopeAngle", "MaxSlopeAngle"],
                ["MoveDirection", "MoveDirection"],
                ["NameDisplayDistance", "NameDisplayDistance"],
                ["NameOcclusion", "NameOcclusion"],
                ["PlatformStand", "PlatformStand"],
                ["RequiresNeck", "RequiresNeck"],
                ["RigType", "RigType"],
                ["RootPart", "RootPart"],
                ["SeatPart", "SeatPart"],
                ["Sit", "Sit"],
                ["TargetPoint", "TargetPoint"],
                ["UseJumpPower", "UseJumpPower"],
                ["TargetPoint", "TargetPoint"],
                ["WalkSpeed", "WalkSpeed"],
                ["WalkToPoint", "WalkToPoint"]
            ]), "ATTRIBUTE")
            .appendField("of")
            .appendField(new Blockly.FieldVariable("humanoid"), "HUMANOID");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['humanoid_get_attribute'] = function(block) {
    var dropdown_attribute = block.getFieldValue('ATTRIBUTE');
    var variable_humanoid = Blockly.Lua.variableDB_.getName(block.getFieldValue('HUMANOID'), Blockly.Variables.NAME_TYPE);
    var code = `${variable_humanoid}.${dropdown_attribute}`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};

Blockly.Blocks['humanoid_set_attribute'] = {
    init: function() {
        this.appendValueInput("NAME")
            .setCheck(null)
            .appendField("set")
            .appendField(new Blockly.FieldDropdown([
                ["AutoJumpEnabled", "AutoJumpEnabled"],
                ["AutoRotate", "AutoRotate"],
                ["AutomaticScalingEnabled", "AutomaticScalingEnabled"],
                ["BreakJointsOnDeath", "BreakJointsOnDeath"],
                ["CameraOffset", "CameraOffset"],
                ["CollisionType", "CollisionType"],
                ["DisplayDistanceType", "DisplayDistanceType"],
                ["DisplayName", "DisplayName"],
                ["Health", "Health"],
                ["HealthDisplayDistance", "HealthDisplayDistance"],
                ["HealthDisplayType", "HealthDisplayType"],
                ["HipHeight", "HipHeight"],
                ["Jump", "Jump"],
                ["JumpHeight", "JumpHeight"],
                ["JumpPower", "JumpPower"],
                ["MaxHealth", "MaxHealth"],
                ["MaxSlopeAngle", "MaxSlopeAngle"],
                ["NameDisplayDistance", "NameDisplayDistance"],
                ["NameOcclusion", "NameOcclusion"],
                ["PlatformStand", "PlatformStand"],
                ["RequiresNeck", "RequiresNeck"],
                ["RigType", "RigType"],
                ["Sit", "Sit"],
                ["TargetPoint", "TargetPoint"],
                ["UseJumpPower", "UseJumpPower"],
                ["TargetPoint", "TargetPoint"],
                ["WalkSpeed", "WalkSpeed"],
                ["WalkToPoint", "WalkToPoint"]
            ]), "ATTRIBUTE")
            .appendField("of")
            .appendField(new Blockly.FieldVariable("humanoid"), "HUMANOID")
            .appendField("to");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['humanoid_set_attribute'] = function(block) {
    var dropdown_attribute = block.getFieldValue('ATTRIBUTE');
    var variable_humanoid = Blockly.Lua.variableDB_.getName(block.getFieldValue('HUMANOID'), Blockly.Variables.NAME_TYPE);
    var value_name = Blockly.Lua.valueToCode(block, 'NAME', Blockly.Lua.ORDER_ATOMIC);
    var code = `${variable_humanoid}.${dropdown_attribute} = ${value_name}\n`
    return code;
};

Blockly.Blocks['vector3_new'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("new vector3");
        this.appendValueInput("X")
            .setCheck("Number")
            .appendField("x");
        this.appendValueInput("Y")
            .setCheck("Number")
            .appendField("y");
        this.appendValueInput("Z")
            .setCheck("Number")
            .appendField("z");
        this.setInputsInline(true);
        this.setOutput(true, "Vector3");
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['vector3_new'] = function(block) {
    var value_x = Blockly.Lua.valueToCode(block, 'X', Blockly.Lua.ORDER_ATOMIC);
    var value_y = Blockly.Lua.valueToCode(block, 'Y', Blockly.Lua.ORDER_ATOMIC);
    var value_z = Blockly.Lua.valueToCode(block, 'Z', Blockly.Lua.ORDER_ATOMIC);
    // TODO: Assemble Lua into code variable.
    var code = `Vector3.new(${value_x}, ${value_y}, ${value_z})`;
    // TODO: Change ORDER_ATOMIC to the correct strength.
    return [code, Blockly.Lua.ORDER_ATOMIC];
};

Blockly.Blocks['players_player_added'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("when")
            .appendField(new Blockly.FieldVariable("player"), "PLAYER")
            .appendField("is added to the game do");
        this.appendStatementInput("HANDLER")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['players_player_added'] = function(block) {
    var variable_player = Blockly.Lua.variableDB_.getName(block.getFieldValue('PLAYER'), Blockly.Variables.NAME_TYPE);
    var statements_handler = Blockly.Lua.statementToCode(block, 'HANDLER')
    var code = `game:GetService("Players").PlayerAdded:Connect(function(${variable_player})
        ${statements_handler}
    end)\n`;
    return code;
};

Blockly.Blocks['script_get_parent'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("get the parent of this script");
        this.setOutput(true, "Instance");
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['script_get_parent'] = function(block) {
    var code = "script.Parent";
    return [code, Blockly.Lua.ORDER_ATOMIC];
};

Blockly.Blocks['tool_activated'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("when")
            .appendField(new Blockly.FieldVariable("tool"), "TOOL")
            .appendField("is activated do");
        this.appendStatementInput("HANDLER")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['tool_activated'] = function(block) {
    var variable_tool = Blockly.Lua.variableDB_.getName(block.getFieldValue('TOOL'), Blockly.Variables.NAME_TYPE);
    var statements_handler = Blockly.Lua.statementToCode(block, 'HANDLER');
    var code = (
        `${variable_tool}.Activated:Connect(function()
    ${statements_handler}
end)\n`);
    return code;
};

Blockly.Blocks['get_local_player'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("get local player");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['get_local_player'] = function(block) {
    var code = "game.Players.LocalPlayer";
    return [code, Blockly.Lua.ORDER_ATOMIC];
};

Blockly.Blocks['get_service'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("get service")
            .appendField(new Blockly.FieldDropdown([
                ["Players", "Players"],
                ["ServerStorage", "ServerStorage"],
                ["ServerScriptService", "ServerScriptService"],
                ["ReplicatedStorage", "ReplicatedStorage"],
            ]), "SERVICE");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['get_service'] = function(block) {
    var dropdown_service = block.getFieldValue('SERVICE');
    var code = `game:GetService("${dropdown_service}")`;
    return code;
};