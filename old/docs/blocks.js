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
                ["Animator", "Animator"],
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
                ["Animator", "Animator"],
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



Blockly.Blocks['part_get_attribute'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("get")
            .appendField(new Blockly.FieldDropdown([
                ["CanCollide", "CanCollide"],
                ["CFrame", "CFrame"],
                ["Position", "Position"],
                ["BrickColor", "BrickColor"]
            ]), "ATTRIBUTE")
            .appendField("of")
            .appendField(new Blockly.FieldVariable("part"), "PART");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['part_set_attribute'] = {
    init: function() {
        this.appendValueInput("VALUE")
            .setCheck(null)
            .appendField("set")
            .appendField(new Blockly.FieldDropdown([
                ["CanCollide", "CanCollide"],
                ["CFrame", "CFrame"],
                ["Position", "Position"],
                ["BrickColor", "BrickColor"]
            ]), "ATTRIBUTE")
            .appendField("of")
            .appendField(new Blockly.FieldVariable("part"), "PART")
            .appendField("to");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['part_set_attribute'] = function(block) {
    var dropdown_attribute = block.getFieldValue('ATTRIBUTE');
    var variable_part = Blockly.Lua.variableDB_.getName(block.getFieldValue('PART'), Blockly.Variables.NAME_TYPE);
    var value_value = Blockly.Lua.valueToCode(block, 'VALUE', Blockly.Lua.ORDER_ATOMIC);
    var code = `${variable_part}.${dropdown_attribute} = ${value_value}\n`;
    return code;
};


Blockly.Blocks['part_on_touched'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("when")
            .appendField(new Blockly.FieldVariable("part"), "PART")
            .appendField("is touched by")
            .appendField(new Blockly.FieldVariable("other_part"), "OTHER_PART")
            .appendField("do");
        this.appendStatementInput("NAME")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['part_on_touched'] = function(block) {
    var variable_part = Blockly.Lua.variableDB_.getName(block.getFieldValue('PART'), Blockly.Variables.NAME_TYPE);
    var variable_other_part = Blockly.Lua.variableDB_.getName(block.getFieldValue('OTHER_PART'), Blockly.Variables.NAME_TYPE);
    var statements_name = Blockly.Lua.statementToCode(block, 'NAME');
    var code = `${variable_part}.Touched:Connect(function(${variable_other_part})
    ${statements_name}
end)\n`;
    return code;
};

Blockly.Blocks['part_on_touch_ended'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("when")
            .appendField(new Blockly.FieldVariable("part"), "PART")
            .appendField("has stopped touching")
            .appendField(new Blockly.FieldVariable("other_part"), "OTHER_PART")
            .appendField("do");
        this.appendStatementInput("NAME")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['part_on_touch_ended'] = function(block) {
    var variable_part = Blockly.Lua.variableDB_.getName(block.getFieldValue('PART'), Blockly.Variables.NAME_TYPE);
    var variable_other_part = Blockly.Lua.variableDB_.getName(block.getFieldValue('OTHER_PART'), Blockly.Variables.NAME_TYPE);
    var statements_name = Blockly.Lua.statementToCode(block, 'NAME');
    var code = `${variable_part}.TouchEnded:Connect(function(${variable_other_part})
    ${statements_name}
end)\n`;
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
            .appendField("wait for child of")
            .appendField(new Blockly.FieldVariable("instance"), "INSTANCE");
        this.appendValueInput("NAME")
            .setCheck("String")
            .appendField("named");
        this.appendDummyInput()
            .appendField("with timeout")
            .appendField(new Blockly.FieldNumber(1), "TIMEOUT");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['instance_wait_for_child'] = function(block) {
    var variable_instance = Blockly.Lua.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.NAME_TYPE);
    var value_name = Blockly.Lua.valueToCode(block, 'NAME', Blockly.Lua.ORDER_ATOMIC);
    var number_timeout = block.getFieldValue('TIMEOUT');
    var code = `${variable_instance}:WaitForChild(${value_name}, ${number_timeout})`;
    return [code, Blockly.Lua.ORDER_NONE];
};

Blockly.Blocks['instance_get_attribute'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("get")
            .appendField(new Blockly.FieldDropdown([
                ["Parent", "Parent"],
                ["Name", "Name"],
                ["Archivable", "Archivable"],
                ["ClassName", "ClassName"]
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


Blockly.Blocks['player_character_added_wait'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("wait for")
            .appendField(new Blockly.FieldVariable("player"), "PLAYER")
            .appendField("character to be added");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['player_character_added_wait'] = function(block) {
    var variable_player = Blockly.Lua.variableDB_.getName(block.getFieldValue('PLAYER'), Blockly.Variables.NAME_TYPE);
    var code = `${variable_player}.CharacterAdded:Wait()`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};

Blockly.Blocks['player_get_attribute'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("get")
            .appendField(new Blockly.FieldDropdown([
                ["Character", "Character"]
            ]), "ATTRIBUTE")
            .appendField("of")
            .appendField(new Blockly.FieldVariable("player"), "PLAYER");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['player_get_attribute'] = function(block) {
    var dropdown_attribute = block.getFieldValue('ATTRIBUTE');
    var variable_player = Blockly.Lua.variableDB_.getName(block.getFieldValue('PLAYER'), Blockly.Variables.NAME_TYPE);
    var code = `${variable_player}.${dropdown_attribute}`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};

Blockly.Blocks['player_set_attribute'] = {
    init: function() {
        this.appendValueInput("VALUE")
            .setCheck(null)
            .appendField("set")
            .appendField(new Blockly.FieldDropdown([
                ["Character", "Character"]
            ]), "ATTRIBUTE")
            .appendField("of")
            .appendField(new Blockly.FieldVariable("player"), "PLAYER")
            .appendField("to");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['player_set_attribute'] = function(block) {
    var dropdown_attribute = block.getFieldValue('ATTRIBUTE');
    var variable_player = Blockly.Lua.variableDB_.getName(block.getFieldValue('PLAYER'), Blockly.Variables.NAME_TYPE);
    var value_value = Blockly.Lua.valueToCode(block, 'VALUE', Blockly.Lua.ORDER_ATOMIC);
    var code = `${variable_player}.${dropdown_attribute} = ${value_value}\n`;
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


// Begin anonymous function mutator blocks

const anonFnArgsMutator = {
    /**
     * Create XML to represent list inputs.
     * @return {!Element} XML storage element.
     * @this {Blockly.Block}
     */
    mutationToDom: function() {
        this.args = this.args || []

        /** @type {!Element} */
        var container = Blockly.utils.xml.createElement("mutation")
        container.setAttribute("args", this.args.join(","))
        return container
    },

    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this {Blockly.Block}
     */
    domToMutation: function(xmlElement) {
        this.args = xmlElement.getAttribute("args").split(",").filter(s => s.length > 0)
        this.updateArgs_()
    },

    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this {Blockly.Block}
     */
    decompose: function(workspace) {
        this.args = this.args || []
        var containerBlock = workspace.newBlock("anon_fn_args_container")
        containerBlock.initSvg()
        var connection = containerBlock.getInput("ARGS").connection
        for (let i = 0; i < this.args.length; i++) {
            const [argName, argId] = this.args[i].split(":")
            let argBlock = workspace.newBlock("anon_fn_arg")
            argBlock.argId = argId
            argBlock.setFieldValue(argName, "NAME")
            argBlock.initSvg()
            connection.connect(argBlock.previousConnection)
            connection = argBlock.nextConnection
        }
        return containerBlock
    },

    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this {Blockly.Block}
     */
    compose: function(containerBlock) {
        const args = []
        let argBlock = containerBlock.getInputTargetBlock("ARGS")
        while (argBlock && !argBlock.isInsertionMarker()) {
            const argName = argBlock.getFieldValue("NAME")
            let argId = argBlock.argId
            if (!argId) {
                argBlock.argId = Blockly.utils.genUid()
                argId = argBlock.argId
            }

            args.push(`${argName}:${argId}`)
            argBlock = argBlock.nextConnection && argBlock.nextConnection.targetBlock()
        }
        this.args = args
        for (let arg of this.args) {
            const [argName, argId] = arg.split(":")
            let v = this.workspace.getVariableById(argId)
            if (v) {
                if (v.name != argName) {
                    // renamed variable
                    this.workspace.renameVariableById(argId, argName)
                }
            } else {
                v = this.workspace.getVariable(argName)
                if (!v) {
                    // new variable
                    this.workspace.createVariable(argName, null, argId)
                }
            }
        }
        this.updateArgs_()
    },

    updateArgs_: function() {
        if (this.args.length > 0) {
            const argsList = "with args: " + getArgList(this)
            if (!this.getFieldValue("ARGS")) {
                this.getInput("DUMMY").appendField(argsList, "ARGS")
            } else {
                this.setFieldValue(argsList, "ARGS")
            }
        } else {
            if (this.getFieldValue("ARGS")) {
                this.getInput("DUMMY").removeField("ARGS")
            }
        }
    }
}

Blockly.Blocks['anon_fn_args_container'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("args");
        this.appendStatementInput("ARGS")
            .setCheck(null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};


Blockly.Blocks['anon_fn_arg'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("input name:")
            .appendField(new Blockly.FieldTextInput("item"), "NAME");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

function getArgList(block) {
    const argNames = (block.args || []).map(arg => arg.split(":")[0])
    const argsList = argNames.length > 0 ? argNames.join(",") : ""
    return argsList
}

// End anonymous function mutator blocks

Blockly.Blocks['tool_activated'] = {
    init: function() {
        this.appendDummyInput("DUMMY")
            .appendField("when")
            .appendField(new Blockly.FieldVariable("tool"), "TOOL")
            .appendField("is activated");
        this.appendStatementInput("HANDLER")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
        this.setMutator(new Blockly.Mutator(["anon_fn_arg"]))
        this.mixin(anonFnArgsMutator)
    },
};




Blockly.Lua['tool_activated'] = function(block) {
    var variable_tool = Blockly.Lua.variableDB_.getName(block.getFieldValue('TOOL'), Blockly.Variables.NAME_TYPE);
    var argsList = getArgList(block)
    var statements_handler = Blockly.Lua.statementToCode(block, 'HANDLER');
    var code = (
        `${variable_tool}.Activated:Connect(function(${argsList})
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
    var code = `game:GetService("Players").LocalPlayer`;
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

Blockly.Blocks['animator_load_animation'] = {
    init: function() {
        this.appendValueInput("ANIMATION")
            .setCheck(null)
            .appendField("load")
            .appendField(new Blockly.FieldVariable("animator"), "ANIMATOR")
            .appendField("with animation");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['animator_load_animation'] = function(block) {
    var variable_animator = Blockly.Lua.variableDB_.getName(block.getFieldValue('ANIMATOR'), Blockly.Variables.NAME_TYPE);
    var value_animation = Blockly.Lua.valueToCode(block, 'ANIMATION', Blockly.Lua.ORDER_ATOMIC);
    var code = `${variable_animator}:LoadAnimation(${value_animation})`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};

Blockly.Blocks['animation_track_play'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("play")
            .appendField(new Blockly.FieldVariable("animation_track"), "ANIMATION_TRACK");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['animation_track_play'] = function(block) {
    var variable_animation_track = Blockly.Lua.variableDB_.getName(block.getFieldValue('ANIMATION_TRACK'), Blockly.Variables.NAME_TYPE);
    var code = `${variable_animation_track}:Play()\n`;
    return code;
};

Blockly.Blocks['sound_play'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("play")
            .appendField(new Blockly.FieldVariable("sound"), "SOUND");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['sound_play'] = function(block) {
    var variable_sound = Blockly.Lua.variableDB_.getName(block.getFieldValue('SOUND'), Blockly.Variables.NAME_TYPE);
    var code = `${variable_sound}:Play()\n`;
    return code;
};