# List of Roblox APIs to implement

## Legend:
- :x: Not done yet
- :heavy_minus_sign: Not applicable
- :hourglass: Work in Progress
- :heavy_check_mark: Done
- :no_entry_sign: Not going to implement

<details>
<summary>
Instance :hourglass:
</summary>

## Instance

[API Reference](https://developer.roblox.com/en-us/api-reference/class/Instance)

### Fields

| Field      | Read               | Write              |
|------------|--------------------|--------------------|
| Archivable | :heavy_check_mark: | :heavy_check_mark: |
| ClassName  | :x:                | :heavy_minus_sign: |
| Name       | :x:                | :x:                |
| Parent     | :heavy_check_mark: | :heavy_check_mark: |

### Functions

| Function                  | Implemented        |
|---------------------------|--------------------|
| ClearAllChildren          | :x:                |
| Clone                     | :heavy_check_mark: |
| Destroy                   | :heavy_check_mark: |
| FindFirstAncestor         | :x:                |
| FindFirstAncestorOfClass  | :x:                |
| FindFirstAncestorWhichIsA | :x:                |
| GetActor                  | :x:                |
| GetAttribute              | :x:                |
| GetAttributeChangedSignal | :x:                |
| GetAttributes             | :x:                |
| GetChildren               | :x:                |
| GetDescendants            | :x:                |
| GetFullName               | :x:                |
| GetPropertyChangedSignal  | :x:                |
| IsA                       | :heavy_check_mark: |
| IsAncestorOf              | :x:                |
| IsDescendantOf            | :x:                |
| SetAttribute              | :x:                |
| WaitForChild              | :heavy_check_mark: |

### Events

| Event              | Implemented |
| -------------------|-------------|
| AncestryChanged    | :x:         |
| AttributeChanged   | :x:         |
| Changed            | :x:         |
| ChildAdded         | :x:         |
| ChildRemoved       | :x:         |
| DescendantAdded    | :x:         |
| DescendantRemoving | :x:         |
</details>

<details>
<summary>Humanoid :hourglass:</summary>

## Humanoid

[API Reference](https://developer.roblox.com/en-us/api-reference/class/Humanoid)

### Fields

| Field | Read | Write |
|-------|------|-------|
| AutoJumpEnabled | :x: | :x: |
| AutoRotate | :x: | :x: |
| AutomaticScalingEnabled | :x: | :x: |
| BreakJointsOnDeath | :x: | :x: |
| CameraOffset | :x: | :x: |
| CollisionType | :x: | :x: |
| DisplayDistanceType | :x: | :x: |
| DisplayName | :x: | :x: |
| FloorMaterial | :x: | :heavy_minus_sign: |
| Health | :x: | :x: |
| HealthDisplayDistance | :x: | :x: |
| HealthDisplayType | :x: | :x: |
| HipHeight | :x: | :x: |
| Jump | :x: | :x: |
| JumpHeight | :x: | :x: |
| JumpPower | :x: | :x: |
| MaxHealth | :x: | :x: |
| MaxSlopeAngle | :x: | :x: |
| MoveDirection | :x: | :heavy_minus_sign: |
| NameDisplayDistance | :x: | :x: |
| NameOcclusion | :x: | :x: |
| PlatformStand | :x: | :x: |
| RequiresNeck | :x: | :x: |
| RigType | :x: | :x: |
| RootPart | :x: | :heavy_minus_sign: |
| SeatPart | :x: | :heavy_minus_sign: |
| Sit | :x: | :x: |
| TargetPoint | :x: | :x: |
| UseJumpPower | :x: | :x: |
| WalkSpeed | :heavy_check_mark: | :heavy_check_mark: |
| WalkToPart | :x: | :x: |
| WalkToPoint | :x: | :x: |

### Functions

| Function | Implemented |
|----------|-------------|
| AddAccessory | :x: |
| ApplyDescription | :x: |
| BuildRigFromAttachments | :x: |
| ChangeState | :x: |
| EquipTool | :x: |
| GetAccessories | :x: |
| GetAppliedDescription | :x: |
| GetBodyPartR15 | :x: |
| GetLimb | :x: |
| GetState | :x: |
| GetStateEnabled | :x: |
| Move | :x: |
| MoveTo | :x: |
| PlayEmote | :x: |
| RemoveAccessories | :x: |
| ReplaceBodyPartR15 | :x: |
| SetStateEnabled | :x: |
| TakeDamage | :x: |
| UnequipTools | :x: |

### Events

| Event | Implemented |
|-------|-------------|
| Climbing | :x: |
| Died | :x: |
| FallingDown | :x: |
| FreeFalling | :x: |
| GettingUp | :x: |
| HealthChanged | :x: |
| Jumping | :x: |
| MoveToFinished | :x: |
| PlatformStanding | :x: |
| Ragdoll | :x: |
| Running | :x: |
| Seated | :x: |
| StateChanged | :x: |
| StateEnabledChanged | :x: |
| Strafing | :x: |
| Swimming | :x: |
| Touched | :x: |

</details>