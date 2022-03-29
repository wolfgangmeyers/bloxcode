// instance blocks

// Instance FindFirstChild ( string name , bool recursive )
// Returns the first child of the Instance found with the given name.
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
    var variable_instance = Blockly.Lua.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.CATEGORY_NAME);
    var value_name = Blockly.Lua.valueToCode(block, 'NAME', Blockly.Lua.ORDER_ATOMIC);
    var code = `${variable_instance}:FindFirstChild(${value_name})`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};

// bool IsA ( string className )
// Returns true if an Instance’s class matches or inherits from a given class
Blockly.Blocks['instance_is_a'] = {
    init: function () {
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

Blockly.Lua['instance_is_a'] = function (block) {
    var variable_instance = Blockly.Lua.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.CATEGORY_NAME);
    var dropdown_type = block.getFieldValue('TYPE');
    var code = `${variable_instance}:isA("${dropdown_type}")`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};

// Instance has a special function called Instance.new which is used to create objects via code. This function takes the name of the class as a parameter and returns the created object. Abstract classes and services cannot be created with the Instance.new function.
Blockly.Blocks['instance_new'] = {
    init: function () {
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

Blockly.Lua['instance_new'] = function (block) {
    var dropdown_type = block.getFieldValue('TYPE');
    var code = `Instance.new("${dropdown_type}")`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};

// same as Instance.new with a parent instance as the second argument
Blockly.Blocks['instance_new_with_parent'] = {
    init: function () {
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

Blockly.Lua['instance_new_with_parent'] = function (block) {
    var dropdown_type = block.getFieldValue('TYPE');
    var variable_instance = Blockly.Lua.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.CATEGORY_NAME);
    var code = `Instance.new("${dropdown_type}", ${variable_instance})`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};

// Instance:GetChildren()
// Returns a table of all the children of an Instance.
Blockly.Blocks['instance_get_children'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("get children of")
            .appendField(new Blockly.FieldVariable("instance"), "INSTANCE");
        this.setOutput(true, "Table");
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['instance_get_children'] = function (block) {
    var variable_instance = Blockly.Lua.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.CATEGORY_NAME);
    var code = `${variable_instance}:GetChildren()`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};

// part blocks

// get various attributes of a part
// CanCollide, CFrame, Position, BrickColor
Blockly.Blocks['part_get_attribute'] = {
    init: function () {
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

Blockly.Lua['part_get_attribute'] = function (block) {
    var variable_part = Blockly.Lua.variableDB_.getName(block.getFieldValue('PART'), Blockly.Variables.CATEGORY_NAME);
    var dropdown_attribute = block.getFieldValue('ATTRIBUTE');
    var code = `${variable_part}["${dropdown_attribute}"]`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
}

// set various attributes of a part
// CanCollide, CFrame, Position, BrickColor
Blockly.Blocks['part_set_attribute'] = {
    init: function () {
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

Blockly.Lua['part_set_attribute'] = function (block) {
    var dropdown_attribute = block.getFieldValue('ATTRIBUTE');
    var variable_part = Blockly.Lua.variableDB_.getName(block.getFieldValue('PART'), Blockly.Variables.CATEGORY_NAME);
    var value_value = Blockly.Lua.valueToCode(block, 'VALUE', Blockly.Lua.ORDER_ATOMIC);
    var code = `${variable_part}.${dropdown_attribute} = ${value_value}\n`;
    return code;
};

// RBXScriptSignal Touched ( BasePart otherPart )
// Fired when a part comes in contact with another part
Blockly.Blocks['part_on_touched'] = {
    init: function () {
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

Blockly.Lua['part_on_touched'] = function (block) {
    var variable_part = Blockly.Lua.variableDB_.getName(block.getFieldValue('PART'), Blockly.Variables.CATEGORY_NAME);
    var variable_other_part = Blockly.Lua.variableDB_.getName(block.getFieldValue('OTHER_PART'), Blockly.Variables.CATEGORY_NAME);
    var statements_name = Blockly.Lua.statementToCode(block, 'NAME');
    var code = `${variable_part}.Touched:Connect(function(${variable_other_part})
    ${statements_name}
end)\n`;
    return code;
};

// RBXScriptSignal TouchEnded ( BasePart otherPart )
// Fired when a part stops touching another part.
Blockly.Blocks['part_on_touch_ended'] = {
    init: function () {
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

Blockly.Lua['part_on_touch_ended'] = function (block) {
    var variable_part = Blockly.Lua.variableDB_.getName(block.getFieldValue('PART'), Blockly.Variables.CATEGORY_NAME);
    var variable_other_part = Blockly.Lua.variableDB_.getName(block.getFieldValue('OTHER_PART'), Blockly.Variables.CATEGORY_NAME);
    var statements_name = Blockly.Lua.statementToCode(block, 'NAME');
    var code = `${variable_part}.TouchEnded:Connect(function(${variable_other_part})
    ${statements_name}
end)\n`;
    return code;
};

// bodyposition blocks

// float P
// Determines how aggressive of a force is applied in reaching the goal position
Blockly.Blocks['bodyposition_set_p'] = {
    init: function () {
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

Blockly.Lua['bodyposition_set_p'] = function (block) {
    var variable_pos = Blockly.Lua.variableDB_.getName(block.getFieldValue('POS'), Blockly.Variables.CATEGORY_NAME);
    var value_name = Blockly.Lua.valueToCode(block, 'NAME', Blockly.Lua.ORDER_ATOMIC);
    var code = `${variable_pos}.P = ${value_name}\n`;
    return code;
};

// control blocks

// number task.wait ( number duration = 0 )
// Yields the current thread until the given duration (in seconds) has elapsed, then resumes the thread on the next Heartbeat step. The actual amount of time elapsed is returned.
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
    var code = `task.wait(${number_amount})\n`;
    return code;
};

// void task.spawn ( function functionOrThread, Variant ... )
// Accepts a function or a thread (as returned by coroutine.create) and calls/resumes it immediately through the engine’s scheduler. Arguments after the first are sent to the function/thread.
Blockly.Blocks['spawn_thread'] = {
    init: function () {
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

Blockly.Lua['spawn_thread'] = function (block) {
    var statements_function = Blockly.Lua.statementToCode(block, 'FUNCTION');
    var code = `task.spawn(function()
    ${statements_function}
    end)\n`;
    return code;
};

// void Destroy ( )
// Sets the Instance.Parent property to nil, locks the Instance.Parent property, disconnects all connections, and calls Destroy on all children.
Blockly.Blocks['instance_destroy'] = {
    init: function () {
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

Blockly.Lua['instance_destroy'] = function (block) {
    var variable_instance = Blockly.Lua.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.CATEGORY_NAME);
    var code = `${variable_instance}:Destroy()\n`
    return code;
};

// Instance WaitForChild ( string childName , double timeOut )
// Returns the child of the Instance with the given name. If the child does not exist, it will yield the current thread until it does.
Blockly.Blocks['instance_wait_for_child'] = {
    init: function () {
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

Blockly.Lua['instance_wait_for_child'] = function (block) {
    var variable_instance = Blockly.Lua.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.CATEGORY_NAME);
    var value_name = Blockly.Lua.valueToCode(block, 'NAME', Blockly.Lua.ORDER_ATOMIC);
    var number_timeout = block.getFieldValue('TIMEOUT');
    var code = `${variable_instance}:WaitForChild(${value_name}, ${number_timeout})`;
    return [code, Blockly.Lua.ORDER_NONE];
};

// get various attributes of an instance
// Parent, Name, Archivable, ClassName
Blockly.Blocks['instance_get_attribute'] = {
    init: function () {
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

Blockly.Lua['instance_get_attribute'] = function (block) {
    var dropdown_attribute = block.getFieldValue('ATTRIBUTE');
    var variable_instance = Blockly.Lua.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.CATEGORY_NAME);
    var code = `${variable_instance}.${dropdown_attribute}`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};

// set various attributes of an instance
// Parent, Name, Archivable
Blockly.Blocks['instance_set_attribute'] = {
    init: function () {
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

Blockly.Lua['instance_set_attribute'] = function (block) {
    var dropdown_attribute = block.getFieldValue('ATTRIBUTE');
    var variable_instance = Blockly.Lua.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.CATEGORY_NAME);
    var value_value = Blockly.Lua.valueToCode(block, 'VALUE', Blockly.Lua.ORDER_ATOMIC);
    var code = `${variable_instance}.${dropdown_attribute} = ${value_value}\n`;
    return code;
};

// Instance Clone ( )
// Create a copy of an object and all its descendants, ignoring objects that are not Archivable
Blockly.Blocks['instance_clone'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("make a clone of")
            .appendField(new Blockly.FieldVariable("instance"), "INSTANCE");
        this.setOutput(true, "Instance");
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['instance_clone'] = function (block) {
    var variable_instance = Blockly.Lua.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.CATEGORY_NAME);
    var code = `${variable_instance}:Clone()`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};

// various events of a Part
// Touched
Blockly.Blocks['part_event_connect'] = {
    init: function () {
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

Blockly.Lua['part_event_connect'] = function (block) {
    var variable_instance = Blockly.Lua.variableDB_.getName(block.getFieldValue('INSTANCE'), Blockly.Variables.CATEGORY_NAME);
    var dropdown_event = block.getFieldValue('EVENT');
    var variable_arg = Blockly.Lua.variableDB_.getName(block.getFieldValue('ARG'), Blockly.Variables.CATEGORY_NAME);
    var statements_name = Blockly.Lua.statementToCode(block, 'NAME');
    var code = `${variable_instance}.${dropdown_event}:Connect(function(${variable_arg})
${statements_name}
end)\n`;
    return code;
};

// sets the value of a local variable using
// "local variable = value"
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
    var variable_variable = Blockly.Lua.variableDB_.getName(block.getFieldValue('VARIABLE'), Blockly.Variables.CATEGORY_NAME);
    var value_value = Blockly.Lua.valueToCode(block, 'VALUE', Blockly.Lua.ORDER_ATOMIC);
    var code = `local ${variable_variable} = ${value_value}\n`;
    return code;
};

// Sets the scale of various humanoid attributes
// Head, BodyWidth, BodyHeight, BodyDepth
Blockly.Blocks['humanoid_set_scale'] = {
    init: function () {
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


Blockly.Lua['humanoid_set_scale'] = function (block) {
    var dropdown_bodypart = block.getFieldValue('BODYPART');
    var variable_humanoid = Blockly.Lua.variableDB_.getName(block.getFieldValue('HUMANOID'), Blockly.Variables.CATEGORY_NAME);
    var value_name = Blockly.Lua.valueToCode(block, 'NAME', Blockly.Lua.ORDER_ATOMIC);
    var code = `${variable_humanoid}.${dropdown_bodypart}Scale.Value = ${value_name}\n`
    return code;
};

// Gets the scale of various humanoid attributes
// Head, BodyWidth, BodyHeight, BodyDepth
Blockly.Blocks['humanoid_get_scale'] = {
    init: function () {
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

Blockly.Lua['humanoid_get_scale'] = function (block) {
    var dropdown_bodypart = block.getFieldValue('BODYPART');
    var variable_humanoid = Blockly.Lua.variableDB_.getName(block.getFieldValue('HUMANOID'), Blockly.Variables.CATEGORY_NAME);
    var code = `${variable_humanoid}.${dropdown_bodypart}Scale.Value`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};

// Gets various attributes of a Humanoid
// AutoJumpEnabled, AutoRotate, AutomaticScalingEnabled, BreakJointsOnDeath, CameraOffset, CollisionType, DisplayDistanceType, DisplayName, FloorMaterial, Health, HealthDisplayDistance, HealthDisplayType, HipHeight, Jump, JumpHeight, JumpPower, MaxHealth, MaxSlopeAngle, MoveDirection, NameDisplayDistance, NameOcclusion, PlatformStand, RequiresNeck, RigType, RootPart, SeatPart, Sit, TargetPoint, UseJumpPower, WalkSpeed, WalkToPoint
Blockly.Blocks['humanoid_get_attribute'] = {
    init: function () {
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

Blockly.Lua['humanoid_get_attribute'] = function (block) {
    var dropdown_attribute = block.getFieldValue('ATTRIBUTE');
    var variable_humanoid = Blockly.Lua.variableDB_.getName(block.getFieldValue('HUMANOID'), Blockly.Variables.CATEGORY_NAME);
    var code = `${variable_humanoid}.${dropdown_attribute}`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};

// Sets various attributes of a Humanoid
// AutoJumpEnabled, AutoRotate, AutomaticScalingEnabled, BreakJointsOnDeath, CameraOffset, CollisionType, DisplayDistanceType, DisplayName, FloorMaterial, Health, HealthDisplayDistance, HealthDisplayType, HipHeight, Jump, JumpHeight, JumpPower, MaxHealth, MaxSlopeAngle, MoveDirection, NameDisplayDistance, NameOcclusion, PlatformStand, RequiresNeck, RigType, RootPart, SeatPart, Sit, TargetPoint, UseJumpPower, WalkSpeed, WalkToPoint
Blockly.Blocks['humanoid_set_attribute'] = {
    init: function () {
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

Blockly.Lua['humanoid_set_attribute'] = function (block) {
    var dropdown_attribute = block.getFieldValue('ATTRIBUTE');
    var variable_humanoid = Blockly.Lua.variableDB_.getName(block.getFieldValue('HUMANOID'), Blockly.Variables.CATEGORY_NAME);
    var value_name = Blockly.Lua.valueToCode(block, 'NAME', Blockly.Lua.ORDER_ATOMIC);
    var code = `${variable_humanoid}.${dropdown_attribute} = ${value_name}\n`
    return code;
};

// data

// Create a new Vector3 with number arguments X, Y, Z
Blockly.Blocks['vector3_new'] = {
    init: function () {
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

Blockly.Lua['vector3_new'] = function (block) {
    var value_x = Blockly.Lua.valueToCode(block, 'X', Blockly.Lua.ORDER_ATOMIC);
    var value_y = Blockly.Lua.valueToCode(block, 'Y', Blockly.Lua.ORDER_ATOMIC);
    var value_z = Blockly.Lua.valueToCode(block, 'Z', Blockly.Lua.ORDER_ATOMIC);
    // TODO: Assemble Lua into code variable.
    var code = `Vector3.new(${value_x}, ${value_y}, ${value_z})`;
    // TODO: Change ORDER_ATOMIC to the correct strength.
    return [code, Blockly.Lua.ORDER_ATOMIC];
};

// Lua nil value
Blockly.Blocks['nil'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("nil");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['nil'] = function (block) {
    var code = 'nil';
    return [code, Blockly.Lua.ORDER_NONE];
};

// Create a new lua table with args
Blockly.Blocks['table_new'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("new table");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
        this.setMutator(new Blockly.Mutator(["anon_fn_arg"]))
        this.mixin(tableArgsMutator)
    },
}

Blockly.Lua['table_new'] = function (block) {
    var code = '{\n';
    var args = block.args;
    for (var i = 0; i < args.length; i++) {
        var argParts = args[i].split(':');
        var argName = argParts[0];
        // get value input for ARG + i
        var argValue = Blockly.Lua.valueToCode(block, 'ARG' + i, Blockly.Lua.ORDER_ATOMIC);
        code += `  ${argName} = ${argValue},\n`;
    }
    code += '}';
    return [code, Blockly.Lua.ORDER_ATOMIC];
};

// Get an attribute of a table
Blockly.Blocks['table_get_attribute'] = {
    init: function () {
        this.appendValueInput("ATTRIBUTE")
            .setCheck(null)
            .appendField("get");
        this.appendDummyInput()
            .appendField("of")
            .appendField(new Blockly.FieldVariable("table"), "TABLE");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['table_get_attribute'] = function (block) {
    var value_attribute = Blockly.Lua.valueToCode(block, 'ATTRIBUTE', Blockly.Lua.ORDER_ATOMIC);
    var variable_table = Blockly.Lua.nameDB_.getName(block.getFieldValue('TABLE'), Blockly.Variables.CATEGORY_NAME);
    var code = `${variable_table}[${value_attribute}]`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};

// Set an attribute of a table
Blockly.Blocks['table_set_attribute'] = {
    init: function () {
        this.appendValueInput("ATTRIBUTE")
            .setCheck(null)
            .appendField("set");
        this.appendValueInput("VALUE")
            .setCheck(null)
            .appendField("of")
            .appendField(new Blockly.FieldVariable("table"), "TABLE")
            .appendField("to");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['table_set_attribute'] = function (block) {
    var value_attribute = Blockly.Lua.valueToCode(block, 'ATTRIBUTE', Blockly.Lua.ORDER_ATOMIC);
    var variable_table = Blockly.Lua.nameDB_.getName(block.getFieldValue('TABLE'), Blockly.Variables.CATEGORY_NAME);
    var value_value = Blockly.Lua.valueToCode(block, 'VALUE', Blockly.Lua.ORDER_ATOMIC);
    var code = `${variable_table}[${value_attribute}] = ${value_value}\n`;
    return code;
};

// StringValue.Value attribute
// Get a value of a string
Blockly.Blocks['stringvalue_get_value'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("get value of")
            .appendField(new Blockly.FieldVariable("stringvalue"), "STRINGVALUE");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['stringvalue_get_value'] = function (block) {
    var variable_stringvalue = Blockly.Lua.nameDB_.getName(block.getFieldValue('STRINGVALUE'), Blockly.Variables.CATEGORY_NAME);
    var code = `${variable_stringvalue}.Value`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};

// Set StringValue.Value attribute
Blockly.Blocks['stringvalue_set_value'] = {
    init: function () {
        this.appendValueInput("VALUE")
            .setCheck(null)
            .appendField("set value of")
            .appendField(new Blockly.FieldVariable("stringvalue"), "STRINGVALUE")
            .appendField("to");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['stringvalue_set_value'] = function (block) {
    var variable_stringvalue = Blockly.Lua.nameDB_.getName(block.getFieldValue('STRINGVALUE'), Blockly.Variables.CATEGORY_NAME);
    var value_value = Blockly.Lua.valueToCode(block, 'VALUE', Blockly.Lua.ORDER_ATOMIC);
    var code = `${variable_stringvalue}.Value = ${value_value}\n`;
    return code;
};


// Declare local variables. Uses declareLocalVariablesMutator mixin.
Blockly.Blocks['declare_local_variables'] = {
    init: function () {
        this.appendDummyInput("DUMMY")
            .appendField("declare local variables", "DECLARE_LABEL");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
        this.setMutator(new Blockly.Mutator(["anon_fn_arg"]))
        this.mixin(declareLocalVariablesMutator);
    }
}

Blockly.Lua['declare_local_variables'] = function (block) {
    var argsList = getArgList(block)
    var code = `local ${argsList}\n`;
    return code;
};


// players

// PlayerService player added event
// RBXScriptSignal PlayerAdded ( Player player )
Blockly.Blocks['players_player_added'] = {
    init: function () {
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

Blockly.Lua['players_player_added'] = function (block) {
    var variable_player = Blockly.Lua.variableDB_.getName(block.getFieldValue('PLAYER'), Blockly.Variables.CATEGORY_NAME);
    var statements_handler = Blockly.Lua.statementToCode(block, 'HANDLER')
    var code = `game:GetService("Players").PlayerAdded:Connect(function(${variable_player})
        ${statements_handler}
    end)\n`;
    return code;
};

// PlayerService player added event wait
// RBXScriptSignal PlayerAdded ( Player player )
Blockly.Blocks['player_character_added_wait'] = {
    init: function () {
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

Blockly.Lua['player_character_added_wait'] = function (block) {
    var variable_player = Blockly.Lua.variableDB_.getName(block.getFieldValue('PLAYER'), Blockly.Variables.CATEGORY_NAME);
    var code = `${variable_player}.CharacterAdded:Wait()`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};

// Get various attributes of a Player
// Character, DisplayName, Name, UserId
Blockly.Blocks['player_get_attribute'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("get")
            .appendField(new Blockly.FieldDropdown([
                ["Character", "Character"],
                ["DisplayName", "DisplayName"],
                ["Name", "Name"],
                ["UserId", "UserId"],
            ]), "ATTRIBUTE")
            .appendField("of")
            .appendField(new Blockly.FieldVariable("player"), "PLAYER");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['player_get_attribute'] = function (block) {
    var dropdown_attribute = block.getFieldValue('ATTRIBUTE');
    var variable_player = Blockly.Lua.variableDB_.getName(block.getFieldValue('PLAYER'), Blockly.Variables.CATEGORY_NAME);
    var code = `${variable_player}.${dropdown_attribute}`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};

// Set various attributes of a Player
// Character, DisplayName, Name, UserId
Blockly.Blocks['player_set_attribute'] = {
    init: function () {
        this.appendValueInput("VALUE")
            .setCheck(null)
            .appendField("set")
            .appendField(new Blockly.FieldDropdown([
                ["Character", "Character"],
                ["DisplayName", "DisplayName"],
                ["Name", "Name"],
                ["UserId", "UserId"],
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

Blockly.Lua['player_set_attribute'] = function (block) {
    var dropdown_attribute = block.getFieldValue('ATTRIBUTE');
    var variable_player = Blockly.Lua.variableDB_.getName(block.getFieldValue('PLAYER'), Blockly.Variables.CATEGORY_NAME);
    var value_value = Blockly.Lua.valueToCode(block, 'VALUE', Blockly.Lua.ORDER_ATOMIC);
    var code = `${variable_player}.${dropdown_attribute} = ${value_value}\n`;
    return code;
};

// PlayerService get players function
// Objects GetPlayers ( )
// Returns a table of all presently connected Player objects
Blockly.Blocks['get_players'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("get players");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['get_players'] = function (block) {
    var code = `game:GetService("Players"):GetPlayers()`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};

// Gets the parent attribute of the current script
Blockly.Blocks['script_get_parent'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("get the parent of this script");
        this.setOutput(true, "Instance");
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['script_get_parent'] = function (block) {
    var code = "script.Parent";
    return [code, Blockly.Lua.ORDER_ATOMIC];
};


// TweenService

// new tween info (just the time)
Blockly.Blocks['tween_info_new'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("new tween info")
        this.appendValueInput("TIME")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("time");
        this.setOutput(true, "TweenInfo");
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['tween_info_new'] = function (block) {
    var value_time = Blockly.Lua.valueToCode(block, 'TIME', Blockly.Lua.ORDER_ATOMIC);
    var code = `TweenInfo.new(${value_time})`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};

// new tween info (all the info)
Blockly.Blocks['tween_info_new_all'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("new tween info")
        this.appendValueInput("TIME")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("time");
        // easing style dropdown - Back, Quad, Sine, Cubic, Quart
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("easing style")
            .appendField(new Blockly.FieldDropdown([
                ["Back", "Enum.EasingStyle.Back"],
                ["Quad", "Enum.EasingStyle.Quad"],
                ["Sine", "Enum.EasingStyle.Sine"],
                ["Cubic", "Enum.EasingStyle.Cubic"],
                ["Quart", "Enum.EasingStyle.Quart"],
            ]), "EASING_STYLE");
        // easing direction dropdown - In, Out, InOut
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("easing direction")
            .appendField(new Blockly.FieldDropdown([
                ["In", "Enum.EasingDirection.In"],
                ["Out", "Enum.EasingDirection.Out"],
                ["InOut", "Enum.EasingDirection.InOut"],
            ]), "EASING_DIRECTION");
        // repeat count
        this.appendValueInput("REPEAT_COUNT")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("repeat count");
        // reverse
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("reverse")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "REVERSE");
        // delay time
        this.appendValueInput("DELAY_TIME")
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("delay time");
        this.setOutput(true, "TweenInfo");
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['tween_info_new_all'] = function (block) {
    var dropdown_easing_style = block.getFieldValue('EASING_STYLE');
    var dropdown_easing_direction = block.getFieldValue('EASING_DIRECTION');
    var value_time = Blockly.Lua.valueToCode(block, 'TIME', Blockly.Lua.ORDER_ATOMIC);
    var value_repeat_count = Blockly.Lua.valueToCode(block, 'REPEAT_COUNT', Blockly.Lua.ORDER_ATOMIC);
    var dropdown_reverse = block.getFieldValue('REVERSE');
    var value_delay_time = Blockly.Lua.valueToCode(block, 'DELAY_TIME', Blockly.Lua.ORDER_ATOMIC);
    var code = `TweenInfo.new(${value_time}, ${dropdown_easing_style}, ${dropdown_easing_direction}, ${value_repeat_count}, ${dropdown_reverse}, ${value_delay_time})`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};

// create tween
// value inputs with right-aligned labels: instance, tween info, goal
Blockly.Blocks['tween_create'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("create tween")
        this.appendValueInput("INSTANCE")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("instance");
        this.appendValueInput("TWEEN_INFO")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("tween info");
        this.appendValueInput("GOAL")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("goal");
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true, "Tween");
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['tween_create'] = function (block) {
    var value_instance = Blockly.Lua.valueToCode(block, 'INSTANCE', Blockly.Lua.ORDER_ATOMIC);
    var value_tween_info = Blockly.Lua.valueToCode(block, 'TWEEN_INFO', Blockly.Lua.ORDER_ATOMIC);
    var value_goal = Blockly.Lua.valueToCode(block, 'GOAL', Blockly.Lua.ORDER_ATOMIC);
    // game:GetService("TweenService")
    var code = `game:GetService("TweenService"):Create(${value_instance}, ${value_tween_info}, ${value_goal})`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};

// play tween
// tween is a variable input
Blockly.Blocks['tween_play'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("play tween")
            .appendField(new Blockly.FieldVariable("tween"), "TWEEN");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['tween_play'] = function (block) {
    var variable_tween = Blockly.Lua.variableDB_.getName(block.getFieldValue('TWEEN'), Blockly.Variables.CATEGORY_NAME);
    var code = `${variable_tween}:Play()\n`;
    return code;
};

// cancel tween
// tween is a variable input
Blockly.Blocks['tween_cancel'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("cancel tween")
            .appendField(new Blockly.FieldVariable("tween"), "TWEEN");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['tween_cancel'] = function (block) {
    var variable_tween = Blockly.Lua.variableDB_.getName(block.getFieldValue('TWEEN'), Blockly.Variables.CATEGORY_NAME);
    var code = `${variable_tween}:Cancel()\n`;
    return code;
};

// Begin anonymous function mutator blocks

const anonFnArgsMutator = {
    /**
     * Create XML to represent list inputs.
     * @return {!Element} XML storage element.
     * @this {Blockly.Block}
     */
    mutationToDom: function () {
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
    domToMutation: function (xmlElement) {
        this.args = xmlElement.getAttribute("args").split(",").filter(s => s.length > 0)
        this.updateArgs_()
    },

    saveExtraState: function () {
        return {
            args: this.args || []
        }
    },

    loadExtraState: function(state) {
        this.args = state.args
        this.updateArgs_()
    },

    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this {Blockly.Block}
     */
    decompose: function (workspace) {
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
    compose: function (containerBlock) {
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
        if (this.manageVariables) {
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
        }
        
        this.updateArgs_()
    },

    manageVariables: true,

    updateArgs_: function () {
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

const declareLocalVariablesMutator = {
    ...anonFnArgsMutator,

    updateArgs_: function() {

        // .appendField(new Blockly.FieldVariable("table"), "TABLE");
        
        // remove any FieldVariables that aren't in the args list
        const input = this.getInput("DUMMY")
        while (input.fieldRow.length > this.args.length + 1) {
            const field = input.fieldRow[input.fieldRow.length - 1]
            console.log(`removing ${field.name}`)
            input.removeField(field.name)
        }
        for (let i = 0; i < this.args.length; i++) {
            const [argName, argId] = this.args[i].split(":")
            if (i >= input.fieldRow.length - 1) {
                console.log(`adding ${argName} as VAR${i}`)
                const field = new Blockly.FieldVariable(argName)
                input.appendField(field, "VAR" + i);
            } else {
                const field = input.fieldRow[i + 1]
                console.log(`updating ${field.name} to ${argName}`)
                input.removeField(field.name)
                input.insertFieldAt(i + 1, new Blockly.FieldVariable(argName), "VAR" + i)
            }
        }
    }
}

// A value input for each arg
const tableArgsMutator = {
    ...anonFnArgsMutator,
    manageVariables: false,

    updateArgs_: function() {
        while (this.inputList.length < this.args.length + 1) {
            this.appendValueInput("ARG" + (this.inputList.length - 1))
                .setAlign(Blockly.ALIGN_RIGHT)
        }
        while (this.inputList.length > this.args.length + 1) {
            this.removeInput("ARG" + (this.inputList.length - 2))
        }
        for (let i = 0; i < this.args.length; i++) {
            const [argName, argId] = this.args[i].split(":")
            const input = this.getInput("ARG" + i)
            if (input.fieldRow.length > 0) {
                const field = input.fieldRow[0]
                if (field.name != argName) {
                    input.removeField(field.name)
                    input.appendField(argName, "ARG" + i)
                }
            } else {
                input.appendField(argName, "ARG" + i)
            }
        }
    },
}

Blockly.Blocks['anon_fn_args_container'] = {
    init: function () {
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
    init: function () {
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
    init: function () {
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

Blockly.Lua['tool_activated'] = function (block) {
    var variable_tool = Blockly.Lua.variableDB_.getName(block.getFieldValue('TOOL'), Blockly.Variables.CATEGORY_NAME);
    var argsList = getArgList(block)
    var statements_handler = Blockly.Lua.statementToCode(block, 'HANDLER');
    var code = (
        `${variable_tool}.Activated:Connect(function(${argsList})
    ${statements_handler}
end)\n`);
    return code;
};

// PlayerService gets the LocalPlayer attribute
Blockly.Blocks['get_local_player'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("get local player");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['get_local_player'] = function (block) {
    var code = `game:GetService("Players").LocalPlayer`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};

// Gets a service by name
Blockly.Blocks['get_service'] = {
    init: function () {
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

Blockly.Lua['get_service'] = function (block) {
    var dropdown_service = block.getFieldValue('SERVICE');
    var code = `game:GetService("${dropdown_service}")`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};

// Animator loads an animation
// AnimationTrack LoadAnimation ( Animation animation )
// Loads an Animation onto an Animator, returning an AnimationTrack
Blockly.Blocks['animator_load_animation'] = {
    init: function () {
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

Blockly.Lua['animator_load_animation'] = function (block) {
    var variable_animator = Blockly.Lua.variableDB_.getName(block.getFieldValue('ANIMATOR'), Blockly.Variables.CATEGORY_NAME);
    var value_animation = Blockly.Lua.valueToCode(block, 'ANIMATION', Blockly.Lua.ORDER_ATOMIC);
    var code = `${variable_animator}:LoadAnimation(${value_animation})`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};

// void Play ()
// Plays the AnimationTrack
Blockly.Blocks['animation_track_play'] = {
    init: function () {
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

Blockly.Lua['animation_track_play'] = function (block) {
    var variable_animation_track = Blockly.Lua.variableDB_.getName(block.getFieldValue('ANIMATION_TRACK'), Blockly.Variables.CATEGORY_NAME);
    var code = `${variable_animation_track}:Play()\n`;
    return code;
};

// sounds

// SoundService:PlayLocalSound(sound)
// Plays a sound locally
// sound is a variable
Blockly.Blocks['sound_service_play_local_sound'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("play local sound")
            .appendField(new Blockly.FieldVariable("sound"), "SOUND")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['sound_service_play_local_sound'] = function (block) {
    var variable_sound = Blockly.Lua.variableDB_.getName(block.getFieldValue('SOUND'), Blockly.Variables.CATEGORY_NAME);
    var code = `game:GetService("SoundService"):PlayLocalSound(${variable_sound})\n`;
    return code;
};

// new sound
Blockly.Blocks['sound_new'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("new sound with id")
            .appendField(new Blockly.FieldTextInput("0123456789"), "SOUND_ID");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

// lua function creates sound in wrapper function and returns it.
Blockly.Lua['sound_new'] = function (block) {
    var text_sound_id = block.getFieldValue('SOUND_ID');
    var code = `(function()
    local sound = Instance.new("Sound")
    sound.SoundId = "rbxassetid://${text_sound_id}"
    return sound
end)()`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};

// Sound:Play() function
Blockly.Blocks['sound_play'] = {
    init: function () {
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

Blockly.Lua['sound_play'] = function (block) {
    var variable_sound = Blockly.Lua.variableDB_.getName(block.getFieldValue('SOUND'), Blockly.Variables.CATEGORY_NAME);
    var code = `${variable_sound}:Play()\n`;
    return code;
};

// datastore

// Get DataStore from the DataStoreService by name
// GlobalDataStore GetDataStore ( string name )
Blockly.Blocks['datastorage_svc_get_datastore'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("get datastore named ");
        this.appendValueInput("NAME")
            .setCheck(null);
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['datastorage_svc_get_datastore'] = function (block) {
    var value_name = Blockly.Lua.valueToCode(block, 'NAME', Blockly.Lua.ORDER_ATOMIC);
    var code = `game:GetService("DataStoreService"):GetDataStore(${value_name})`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};

// Get an item from a Datastore
Blockly.Blocks['datastorage_svc_get'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("get data ");
        this.appendValueInput("NAME")
            .setCheck(null);
        this.appendDummyInput()
            .appendField("from datastore ")
            .appendField(new Blockly.FieldVariable("datastore"), "DATASTORE");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

// wrapper function for simpler usage
Blockly.Lua['datastorage_svc_get'] = function (block) {
    var value_name = Blockly.Lua.valueToCode(block, 'NAME', Blockly.Lua.ORDER_ATOMIC);
    var variable_datastore = Blockly.Lua.variableDB_.getName(block.getFieldValue('DATASTORE'), Blockly.Variables.CATEGORY_NAME);
    // TODO: Assemble Lua into code variable.
    var code = `(function()
    local success, result = pcall(function()
        return ${variable_datastore}:GetAsync(${value_name})
    end)
    if not success then
        print(result)
        return nil
    end
    return result
end)()
`;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Lua.ORDER_NONE];
};

// Set an item in a Datastore
Blockly.Blocks['datastorage_svc_set'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("set data ");
        this.appendValueInput("NAME")
            .setCheck(null);
        this.appendDummyInput()
            .appendField("in datastore ")
            .appendField(new Blockly.FieldVariable("datastore"), "DATASTORE");
        this.appendDummyInput()
            .appendField("to");
        this.appendValueInput("VALUE")
            .setCheck(null);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['datastorage_svc_set'] = function (block) {
    var value_name = Blockly.Lua.valueToCode(block, 'NAME', Blockly.Lua.ORDER_ATOMIC);
    var variable_datastore = Blockly.Lua.nameDB_.getName(block.getFieldValue('DATASTORE'), Blockly.Variables.CATEGORY_NAME);
    var value_value = Blockly.Lua.valueToCode(block, 'VALUE', Blockly.Lua.ORDER_ATOMIC);
    var code = `local success, errorMessage = pcall(function()
    ${variable_datastore}:SetAsync(${value_name}, ${value_value})
end)
if not success then
    print(errorMessage)
end
`;
    return code;
};

// marketplace PromptGamePassPurchaseFinished event
// RBXScriptSignal 
// PromptGamePassPurchaseFinished ( Instance player , int64 gamePassId , bool wasPurchased )
Blockly.Blocks['marketplace_game_pass_purchased'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("when a gamepass with")
            .appendField(new Blockly.FieldVariable("id"), "GAMEPASS")
            .appendField("is purchased by")
            .appendField(new Blockly.FieldVariable("player"), "PLAYER");
        this.appendStatementInput("HANDLER")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['marketplace_game_pass_purchased'] = function (block) {
    var variable_gamepass = Blockly.Lua.nameDB_.getName(block.getFieldValue('GAMEPASS'), Blockly.Variables.CATEGORY_NAME);
    var variable_player = Blockly.Lua.nameDB_.getName(block.getFieldValue('PLAYER'), Blockly.Variables.CATEGORY_NAME);
    var statements_handler = Blockly.Lua.statementToCode(block, 'HANDLER');
    var code = `game:GetService("MarketplaceService").PromptGamePassPurchaseFinished:Connect(function(${variable_player}, ${variable_gamepass}, purchaseSuccess)
    if purchaseSuccess == true then
        ${statements_handler}
    end
end)`;
    return code;
};

// checks if player owns gamepass
Blockly.Blocks['marketplace_player_owns_gamepass'] = {
    init: function () {
        this.appendValueInput("NAME")
            .setCheck(null)
            .appendField(new Blockly.FieldVariable("player"), "PLAYER")
            .appendField("owns gamepass with id");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['marketplace_player_owns_gamepass'] = function (block) {
    var variable_player = Blockly.Lua.nameDB_.getName(block.getFieldValue('PLAYER'), Blockly.Variables.CATEGORY_NAME);
    var value_name = Blockly.Lua.valueToCode(block, 'NAME', Blockly.Lua.ORDER_ATOMIC);
    var code = `(function()
    local hasPass = false
    local success, message = pcall(function()
        hasPass = game:GetService("MarketplaceService"):UserOwnsGamePassAsync(${variable_player}.UserId, ${value_name})
    end)
    if not success then
        warn("Error while checking if player has pass: " .. tostring(message))
        return false
    end
    return hasPass
end)()`;

    return [code, Blockly.Lua.ORDER_ATOMIC];
};

// void PromptGamePassPurchase ( Instance player , int64 gamePassId )
// Used to prompt a user to purchase a game pass with the given assetId.
Blockly.Blocks['marketplace_prompt_gamepass_purchase'] = {
    init: function () {
        this.appendValueInput("NAME")
            .setCheck(null)
            .appendField("prompt")
            .appendField(new Blockly.FieldVariable("player"), "PLAYER")
            .appendField("to purchase gamepass with id");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['marketplace_prompt_gamepass_purchase'] = function (block) {
    var variable_player = Blockly.Lua.nameDB_.getName(block.getFieldValue('PLAYER'), Blockly.Variables.CATEGORY_NAME);
    var value_name = Blockly.Lua.valueToCode(block, 'NAME', Blockly.Lua.ORDER_ATOMIC);
    var code = `game:GetService("MarketplaceService"):PromptGamePassPurchase(${variable_player}, ${value_name})\n`;
    return code;
};

// table loops

// Iterates through a table using the pairs function
Blockly.Blocks['table_pairs_foreach'] = {
    init: function () {
        this.appendValueInput("NAME")
            .setCheck(null)
            .appendField("for each")
            .appendField(new Blockly.FieldVariable("item"), "ITEM")
            .appendField("in");
        this.appendDummyInput()
            .appendField("do");
        this.appendStatementInput("HANDLER")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['table_pairs_foreach'] = function (block) {
    var variable_item = Blockly.Lua.nameDB_.getName(block.getFieldValue('ITEM'), Blockly.Variables.CATEGORY_NAME);
    var value_name = Blockly.Lua.valueToCode(block, 'NAME', Blockly.Lua.ORDER_ATOMIC);
    var statements_handler = Blockly.Lua.statementToCode(block, 'HANDLER');

    var code = `for i, ${variable_item} in pairs(${value_name}) do
${statements_handler}
end
`;
    return code;
};

// text blocks

// Concat two strings
Blockly.Blocks['text_concat'] = {
    init: function () {
        this.appendValueInput("VALUE1")
            .setCheck(null)
            .appendField("concat");
        this.appendValueInput("VALUE2")
            .setCheck(null)
            .appendField("and");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['text_concat'] = function (block) {
    var value_value1 = Blockly.Lua.valueToCode(block, 'VALUE1', Blockly.Lua.ORDER_ATOMIC);
    var value_value2 = Blockly.Lua.valueToCode(block, 'VALUE2', Blockly.Lua.ORDER_ATOMIC);
    var code = `${value_value1}..${value_value2}`;
    return [code, Blockly.Lua.ORDER_NONE];
};

// mutator UI for argument count
Blockly.Blocks['arg_count'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("arg count:")
            .appendField(new Blockly.FieldNumber(0, 0, 10), "ARG_COUNT");
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

// argument count mutator mixin
const argCountMutatorMixin = {
    saveExtraState: function () {
        return {
            "argCount": this.argCount_,
        };
    },
    loadExtraState: function (state) {
        this.argCount_ = state["argCount"] || 0;
        this.updateShape_();
    },
    decompose: function (workspace) {
        const topBlock = workspace.newBlock('arg_count');
        topBlock.setFieldValue(this.argCount_, 'ARG_COUNT');
        topBlock.initSvg()
        return topBlock;
    },
    compose: function (topBlock) {
        this.argCount_ = parseInt(topBlock.getFieldValue('ARG_COUNT'));
        this.updateShape_();
    }
};

// RemoteEvent
// void FireServer ( Tuple arguments )
// Fires the RemoteEvent.OnServerEvent event on the server using the arguments specified with an additional player argument at the beginning.
Blockly.Blocks['remote_event_fire_server'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("send")
            .appendField(new Blockly.FieldVariable("remote event"), "REMOTE_EVENT")
            .appendField("to the server");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
        this.setMutator(new Blockly.Mutator([]))

        this.argCount_ = [];
    },

    updateShape_: function () {
        // remove TXT_WITH_ARGS field
        if (this.inputList[0].fieldRow.length == 4) {
            if (this.argCount_ == 0) {
                this.inputList[0].removeField("TXT_WITH_ARGS");
            }
        } else {
            if (this.argCount_ > 0) {
                this.inputList[0]
                    .appendField(new Blockly.FieldLabelSerializable("with args"), "TXT_WITH_ARGS")
            }
        }
        // synchronize value inputs with argCount_
        while (this.argCount_ < this.inputList.length - 1) {
            this.removeInput("ARG" + (this.inputList.length - 2));
        }
        while (this.argCount_ > this.inputList.length - 1) {
            this.appendValueInput("ARG" + (this.inputList.length - 1))
                .setCheck(null)
        }
    },
    ...argCountMutatorMixin,
}

Blockly.Lua['remote_event_fire_server'] = function (block) {
    var variable_remote_event = Blockly.Lua.nameDB_.getName(block.getFieldValue('REMOTE_EVENT'), Blockly.Variables.CATEGORY_NAME);
    let values = [];
    for (let i = 0; i < block.argCount_; i++) {
        values.push(Blockly.Lua.valueToCode(block, 'ARG' + i, Blockly.Lua.ORDER_ATOMIC));
    }
    let code = `${variable_remote_event}:FireServer(${values.join(', ')})\n`;
    return code;
};

// RemoteEvent
// RBXScriptSignal OnServerEvent ( Player player , Tuple arguments )
// Fires listening functions in Script when RemoteEvent:FireServer is called from a LocalScript.
Blockly.Blocks['remote_event_on_server_event'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("when")
            .appendField(new Blockly.FieldVariable("remote_event"), "REMOTE_EVENT")
            .appendField("from ")
            .appendField(new Blockly.FieldVariable("player"), "PLAYER")
            .appendField("is received on the server");
        this.appendDummyInput("ARGS")
            .appendField("with")
            .setVisible(false);
        this.appendStatementInput("ACTION")
            .setCheck(null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setMutator(new Blockly.Mutator([]))

        this.argCount_ = [];
    },
    ...argCountMutatorMixin,
    updateShape_: function () {
        let argsInput = this.getInput("ARGS");
        if (this.argCount_ == 0) {
            argsInput.setVisible(false);
        } else {
            argsInput.setVisible(true);
            while (this.argCount_ < argsInput.fieldRow.length - 1) {
                argsInput.removeField("ARG" + (argsInput.fieldRow.length - 2));
            }
            while (this.argCount_ > argsInput.fieldRow.length - 1) {
                argsInput.appendField(new Blockly.FieldVariable("arg" + (argsInput.fieldRow.length - 1)), "ARG" + (argsInput.fieldRow.length - 1));
            }
        }
    },
};

Blockly.Lua['remote_event_on_server_event'] = function (block) {
    var variable_remote_event = Blockly.Lua.nameDB_.getName(block.getFieldValue('REMOTE_EVENT'), Blockly.Variables.CATEGORY_NAME);
    var variable_player = Blockly.Lua.nameDB_.getName(block.getFieldValue('PLAYER'), Blockly.Variables.CATEGORY_NAME);
    var statements_action = Blockly.Lua.statementToCode(block, 'ACTION');
    let args = [variable_player];
    for (let i = 0; i < block.argCount_; i++) {
        let arg = Blockly.Lua.nameDB_.getName(block.getFieldValue('ARG' + i), Blockly.Variables.CATEGORY_NAME);
        args.push(arg);
    }
    var code = `${variable_remote_event}.OnServerEvent:Connect(function(${args.join(', ')})
    ${statements_action}
end)
`;
    return code;
};

// RemoteEvent
// void FireClient ( Player player , Tuple arguments )
// Fires RemoteEvent.OnClientEvent for the specified player.
Blockly.Blocks['remote_event_fire_client'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("send")
            .appendField(new Blockly.FieldVariable("remote event"), "REMOTE_EVENT")
            .appendField("to the client for")
            .appendField(new Blockly.FieldVariable("player"), "PLAYER");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
        this.setMutator(new Blockly.Mutator([]))
        this.argCount_ = [];
    },
    ...argCountMutatorMixin,
    updateShape_: function () {
        // remove TXT_WITH_ARGS field
        if (this.inputList[0].fieldRow.length == 5) {
            if (this.argCount_ == 0) {
                this.inputList[0].removeField("TXT_WITH_ARGS");
            }
        } else {
            if (this.argCount_ > 0) {
                this.inputList[0]
                    .appendField(new Blockly.FieldLabelSerializable("with args"), "TXT_WITH_ARGS")
            }
        }
        // synchronize value inputs with argCount_
        while (this.argCount_ < this.inputList.length - 1) {
            this.removeInput("ARG" + (this.inputList.length - 2));
        }
        while (this.argCount_ > this.inputList.length - 1) {
            this.appendValueInput("ARG" + (this.inputList.length - 1))
                .setCheck(null)
        }
    },
};

Blockly.Lua['remote_event_fire_client'] = function (block) {
    var variable_remote_event = Blockly.Lua.nameDB_.getName(block.getFieldValue('REMOTE_EVENT'), Blockly.Variables.CATEGORY_NAME);
    var variable_player = Blockly.Lua.nameDB_.getName(block.getFieldValue('PLAYER'), Blockly.Variables.CATEGORY_NAME);
    let values = [variable_player];
    for (let i = 0; i < block.argCount_; i++) {
        values.push(Blockly.Lua.valueToCode(block, 'ARG' + i, Blockly.Lua.ORDER_ATOMIC));
    }
    var code = `${variable_remote_event}:FireClient(${values.join(', ')})\n`;
    return code;
};

// RemoteEvent
// RBXScriptSignal OnClientEvent ( Tuple arguments )
Blockly.Blocks['remote_event_on_client_event'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("when")
            .appendField(new Blockly.FieldVariable("remote_event"), "REMOTE_EVENT")
            .appendField("is received on the client");
        this.appendDummyInput("ARGS")
            .appendField("with")
            .setVisible(false);
        this.appendStatementInput("ACTION")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
        this.setMutator(new Blockly.Mutator([]));
        this.argCount_ = [];
    },
    ...argCountMutatorMixin,
    updateShape_: function () {
        let argsInput = this.getInput("ARGS");
        if (this.argCount_ == 0) {
            argsInput.setVisible(false);
        } else {
            argsInput.setVisible(true);
            while (this.argCount_ < argsInput.fieldRow.length - 1) {
                argsInput.removeField("ARG" + (argsInput.fieldRow.length - 2));
            }
            while (this.argCount_ > argsInput.fieldRow.length - 1) {
                argsInput.appendField(new Blockly.FieldVariable("arg" + (argsInput.fieldRow.length - 1)), "ARG" + (argsInput.fieldRow.length - 1));
            }
        }
    },
};

Blockly.Lua['remote_event_on_client_event'] = function (block) {
    var variable_remote_event = Blockly.Lua.nameDB_.getName(block.getFieldValue('REMOTE_EVENT'), Blockly.Variables.CATEGORY_NAME);
    var statements_action = Blockly.Lua.statementToCode(block, 'ACTION');
    let args = [];
    for (let i = 0; i < block.argCount_; i++) {
        let arg = Blockly.Lua.nameDB_.getName(block.getFieldValue('ARG' + i), Blockly.Variables.CATEGORY_NAME);
        args.push(arg);
    }
    var code = `${variable_remote_event}.OnClientEvent:Connect(function(${args.join(', ')})
    ${statements_action}
end)
`;
    return code;
};

// gui

// GuiButton
// RBXScriptSignal MouseButton1Click ( )
// Fired when the mouse has fully left clicked the GUI button
Blockly.Blocks['gui_button_mouse1_click'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("when")
            .appendField(new Blockly.FieldVariable("gui_button"), "BUTTON")
            .appendField("is clicked with the left mouse button");
        this.appendStatementInput("ACTION")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['gui_button_mouse1_click'] = function (block) {
    var variable_button = Blockly.Lua.nameDB_.getName(block.getFieldValue('BUTTON'), Blockly.Variables.CATEGORY_NAME);
    var statements_action = Blockly.Lua.statementToCode(block, 'ACTION');
    var code = `${variable_button}.MouseButton1Click:Connect(function()
${statements_action}
end)
`;
    return code;
}

// get various attributes of GuiObject
// Visible
Blockly.Blocks['gui_object_get_attribute'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("get")
            .appendField(new Blockly.FieldDropdown([["Visible", "Visible"]]), "ATTRIBUTE")
            .appendField("of")
            .appendField(new Blockly.FieldVariable("gui_object"), "GUI_OBJECT");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['gui_object_get_attribute'] = function (block) {
    var dropdown_attribute = block.getFieldValue('ATTRIBUTE');
    var variable_gui_object = Blockly.Lua.nameDB_.getName(block.getFieldValue('GUI_OBJECT'), Blockly.Variables.CATEGORY_NAME);
    var code = `${variable_gui_object}.${dropdown_attribute}`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
};

// Set various attributes of GuiObject
// Visible
Blockly.Blocks['gui_object_set_attribute'] = {
    init: function () {
        this.appendValueInput("VALUE")
            .setCheck(null)
            .appendField("set")
            .appendField(new Blockly.FieldDropdown([["Visible", "Visible"]]), "ATTRIBUTE")
            .appendField("of")
            .appendField(new Blockly.FieldVariable("gui_object"), "GUI_OBJECT")
            .appendField("to");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['gui_object_set_attribute'] = function (block) {
    var dropdown_attribute = block.getFieldValue('ATTRIBUTE');
    var variable_gui_object = Blockly.Lua.nameDB_.getName(block.getFieldValue('GUI_OBJECT'), Blockly.Variables.CATEGORY_NAME);
    var value_value = Blockly.Lua.valueToCode(block, 'VALUE', Blockly.Lua.ORDER_ATOMIC);
    var code = `${variable_gui_object}.${dropdown_attribute} = ${value_value}\n`;
    return code;
};

// TextLabel get various attributes
// Text, TextTransparency
Blockly.Blocks['gui_text_label_get_attribute'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("get")
            .appendField(new Blockly.FieldDropdown([
                ["Text", "Text"],
                ["TextTransparency", "TextTransparency"]
            ]), "ATTRIBUTE")
            .appendField("of")
            .appendField(new Blockly.FieldVariable("gui_text_label"), "GUI_TEXT_LABEL");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    },
};

Blockly.Lua['gui_text_label_get_attribute'] = function (block) {
    var dropdown_attribute = block.getFieldValue('ATTRIBUTE');
    var variable_gui_text_label = Blockly.Lua.nameDB_.getName(block.getFieldValue('GUI_TEXT_LABEL'), Blockly.Variables.CATEGORY_NAME);
    var code = `${variable_gui_text_label}.${dropdown_attribute}`;
    return [code, Blockly.Lua.ORDER_ATOMIC];
}

// TextLabel set various attributes
// Text, TextTransparency
Blockly.Blocks['gui_text_label_set_attribute'] = {
    init: function () {
        this.appendValueInput("VALUE")
            .setCheck(null)
            .appendField("set")
            .appendField(new Blockly.FieldDropdown([
                ["Text", "Text"],
                ["TextTransparency", "TextTransparency"]
            ]), "ATTRIBUTE")
            .appendField("of")
            .appendField(new Blockly.FieldVariable("gui_text_label"), "GUI_TEXT_LABEL")
            .appendField("to");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Lua['gui_text_label_set_attribute'] = function (block) {
    var dropdown_attribute = block.getFieldValue('ATTRIBUTE');
    var variable_gui_text_label = Blockly.Lua.nameDB_.getName(block.getFieldValue('GUI_TEXT_LABEL'), Blockly.Variables.CATEGORY_NAME);
    var value_value = Blockly.Lua.valueToCode(block, 'VALUE', Blockly.Lua.ORDER_ATOMIC);
    var code = `${variable_gui_text_label}.${dropdown_attribute} = ${value_value}\n`;
    return code;
}