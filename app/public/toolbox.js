var bloxcode_toolbox = {
    "kind": "categoryToolbox",
    "contents": [
        {
            "kind": "category",
            "name": "Logic",
            "contents": [
                {
                    "kind": "block",
                    "type": "controls_if",
                },
                {
                    "kind": "block",
                    "type": "logic_compare",
                    "fields": {
                        "OP": "EQ",
                    },
                },
                {
                    "kind": "block",
                    "type": "logic_operation",
                    "fields": {
                        "OP": "AND"
                    }
                },
                {
                    "kind": "block",
                    "type": "logic_negate"
                },
                {
                    "kind": "block",
                    "type": "logic_boolean",
                    "fields": {
                        "BOOL": "TRUE"
                    }
                }
            ],
        },
        {
            "kind": "category",
            "name": "Loops",
            "contents": [
                {
                    "kind": "block",
                    "type": "controls_repeat_ext",
                    "inputs": {
                        "TIMES": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": 10
                                },
                            },
                        },
                    }
                },
                {
                    "kind": "block",
                    "type": "controls_whileUntil",
                },
                {
                    "kind": "block",
                    "type": "table_pairs_foreach",
                }
            ],
        },
        {
            "kind": "category",
            "name": "Math",
            "contents": [
                {
                    "kind": "block",
                    "type": "math_number",
                    "fields": {
                        "NUM": 123,
                    }
                },
                {
                    "kind": "block",
                    "type": "math_arithmetic",
                },
                {
                    "kind": "block",
                    "type": "math_single",
                },
                {
                    "kind": "block",
                    "type": "math_trig",
                },
                {
                    "kind": "block",
                    "type": "math_constant",
                },
                {
                    "kind": "block",
                    "type": "math_number_property",
                },
                {
                    "kind": "block",
                    "type": "math_round",
                },
                {
                    "kind": "block",
                    "type": "math_on_list",
                },
                {
                    "kind": "block",
                    "type": "math_modulo",
                },
                {
                    "kind": "block",
                    "type": "math_constrain",
                    "inputs": {
                        "LOW": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": 1,
                                },
                            },
                        },
                        "HIGH": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": 10,
                                },
                            },
                        },
                    }
                },
                {
                    "kind": "block",
                    "type": "math_random_int",
                    "inputs": {
                        "FROM": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": 1,
                                },
                            },
                        },
                        "TO": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": 10,
                                },
                            },
                        },
                    }
                },
                {
                    "kind": "block",
                    "type": "math_random_float",
                },
                {
                    "kind": "block",
                    "type": "math_atan2",
                }
            ],
        },
        {
            "kind": "category",
            "name": "Text",
            "contents": [
                {
                    "kind": "block",
                    "type": "text",
                    "fields": {
                        "TEXT": "Hello",
                    }
                },
                {
                    "kind": "block",
                    "type": "text_length",
                },
                {
                    "kind": "block",
                    "type": "text_print",
                },
                {
                    "kind": "block",
                    "type": "text_concat",
                },
            ],
        },
        {
            "kind": "category",
            "name": "Variables",
            "custom": "VARIABLE",
        },
        {
            "kind": "category",
            "name": "Local Variables",
            "contents": [
                {
                    "kind": "block",
                    "type": "set_local_variable",
                },
            ],
        },
        {
            "kind": "category",
            "name": "Functions",
            "custom": "PROCEDURE",
        },
        {
            "kind": "category",
            "name": "Control",
            "contents": [
                {
                    "kind": "block",
                    "type": "wait",
                },
                {
                    "kind": "block",
                    "type": "spawn_thread",
                }
            ]
        },
        {
            "kind": "category",
            "name": "Data",
            "contents": [
                {
                    "kind": "block",
                    "type": "math_number",
                    "fields": {
                        "NUM": 123,
                    }
                },
                {
                    "kind": "block",
                    "type": "vector3_new",
                    "inputs": {
                        "X": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": 0,
                                },
                            },
                        },
                        "Y": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": 0,
                                },
                            },
                        },
                        "Z": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": 0,
                                },
                            },
                        },
                    }
                },
            ]
        },
        {
            "kind": "category",
            "name": "Instance",
            "contents": [
                {
                    "kind": "block",
                    "type": "instance_new",
                },
                {
                    "kind": "block",
                    "type": "instance_new_with_parent",
                },
                {
                    "kind": "block",
                    "type": "instance_find_first_child",
                    "inputs": {
                        "NAME": {
                            "block": {
                                "type": "text",
                                "fields": {
                                    "TEXT": "Child",
                                },
                            },
                        },
                    }
                },
                {
                    "kind": "block",
                    "type": "instance_wait_for_child",
                    "inputs": {
                        "NAME": {
                            "block": {
                                "type": "text",
                                "fields": {
                                    "TEXT": "Child",
                                },
                            },
                        },
                    }
                },
                {
                    "kind": "block",
                    "type": "instance_destroy",
                },
                {
                    "kind": "block",
                    "type": "instance_is_a",
                },
                {
                    "kind": "block",
                    "type": "instance_get_attribute",
                },
                {
                    "kind": "block",
                    "type": "instance_set_attribute",
                },
                {
                    "kind": "block",
                    "type": "instance_clone",
                },
                {
                    "kind": "block",
                    "type": "script_get_parent",
                }
            ]
        },
        {
            "kind": "category",
            "name": "Part",
            "contents": [
                {
                    "kind": "block",
                    "type": "part_on_touched",
                },
                {
                    "kind": "block",
                    "type": "part_get_attribute",
                },
                {
                    "kind": "block",
                    "type": "part_set_attribute",
                }
            ]
        },
        {
            "kind": "category",
            "name": "Humanoid",
            "contents": [

                {
                    "kind": "block",
                    "type": "humanoid_set_scale",
                    "inputs": {
                        "NAME": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": 1.0,
                                },
                            },
                        },
                    },
                },
                {
                    "kind": "block",
                    "type": "humanoid_get_scale",
                },
                {
                    "kind": "block",
                    "type": "humanoid_get_attribute",
                },
                {
                    "kind": "block",
                    "type": "humanoid_set_attribute",
                }
            ]
        },
        {
            "kind": "category",
            "name": "Services",
            "contents": [
                {
                    "kind": "block",
                    "type": "get_service",
                },
                {
                    "kind": "category",
                    "name": "Players",
                    "contents": [
                        {
                            "kind": "block",
                            "type": "get_players",
                        },
                        {
                            "kind": "block",
                            "type": "players_player_added",
                        },
                        {
                            "kind": "block",
                            "type": "get_local_player",
                        },
                        {
                            "kind": "block",
                            "type": "player_character_added_wait",
                        },
                        {
                            "kind": "block",
                            "type": "player_get_attribute",
                        },
                        {
                            "kind": "block",
                            "type": "player_set_attribute",
                        }
                    ],
                },
                {
                    "kind": "category",
                    "name": "Data Storage",
                    "contents": [
                        {
                            "kind": "block",
                            "type": "datastorage_svc_get_datastore",
                            "inputs": {
                                "NAME": {
                                    "block": {
                                        "type": "text",
                                        "fields": {
                                            "TEXT": "DataStore",
                                        },
                                    },
                                },
                            },
                        },
                        {
                            "kind": "block",
                            "type": "datastorage_svc_get",
                            "inputs": {
                                "NAME": {
                                    "block": {
                                        "type": "text",
                                        "fields": {
                                            "TEXT": "key",
                                        },
                                    },
                                },
                            },
                        },
                        {
                            "kind": "block",
                            "type": "datastorage_svc_set",
                            "inputs": {
                                "NAME": {
                                    "block": {
                                        "type": "text",
                                        "fields": {
                                            "TEXT": "key",
                                        },
                                    },
                                },
                                "VALUE": {
                                    "block": {
                                        "type": "text",
                                        "fields": {
                                            "TEXT": "value",
                                        },
                                    },
                                },
                            },
                        }
                    ]
                },
                {
                    "kind": "category",
                    "name": "Marketplace",
                    "contents": [
                        {
                            "kind": "block",
                            "type": "marketplace_game_pass_purchased",
                        },
                        {
                            "kind": "block",
                            "type": "marketplace_player_owns_gamepass",
                            "inputs": {
                                "NAME": {
                                    "block": {
                                        "type": "math_number",
                                        "fields": {
                                            "NUM": 123,
                                        },
                                    },
                                },
                            },
                        },
                        {
                            "kind": "block",
                            "type": "marketplace_prompt_gamepass_purchase",
                            "inputs": {
                                "NAME": {
                                    "block": {
                                        "type": "math_number",
                                        "fields": {
                                            "NUM": 123,
                                        },
                                    },
                                },
                            },
                        }
                    ]
                }
            ]
        },
        {
            "kind": "category",
            "name": "Tools",
            "contents": [
                {
                    "kind": "block",
                    "type": "tool_activated",
                }
            ]
        },
        {
            "kind": "category",
            "name": "Animation",
            "contents": [
                {
                    "kind": "block",
                    "type": "animator_load_animation",
                },
                {
                    "kind": "block",
                    "type": "animation_track_play",
                }
            ]
        },
        {
            "kind": "category",
            "name": "Sound",
            "contents": [
                {
                    "kind": "block",
                    "type": "sound_play",
                }
            ]
        },
        {
            "kind": "category",
            "name": "Remote Events",
            "contents": [
                {
                    "kind": "block",
                    "type": "remote_event_fire_server",
                }
            ]
        }
    ]
}