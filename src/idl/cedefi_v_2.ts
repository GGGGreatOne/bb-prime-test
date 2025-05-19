/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/cedefi_v_2.json`.
 */
export type CedefiV2 = {
	address: '6qN1ruT39A19Uby9K7EZtgf9fHunqS53ovkskBkgV7t2'
	metadata: {
		name: 'cedefiV2'
		version: '0.1.0'
		spec: '0.1.0'
		description: 'Created with Anchor'
	}
	instructions: [
		{
			name: 'batchClaim'
			discriminator: [3, 1, 13, 209, 198, 215, 144, 13]
			accounts: [
				{
					name: 'configure'
					docs: ['Global configuration']
					pda: {
						seeds: [
							{
								kind: 'const'
								value: [99, 111, 110, 102, 105, 103, 117, 114, 101]
							}
						]
					}
				},
				{
					name: 'vault'
					docs: ['Token Vault']
					pda: {
						seeds: [
							{
								kind: 'const'
								value: [118, 97, 117, 108, 116]
							},
							{
								kind: 'arg'
								path: 'arg.token'
							},
							{
								kind: 'arg'
								path: 'arg.strategy_id'
							}
						]
					}
				},
				{
					name: 'closeRequests'
					docs: ['Close Request']
					writable: true
					pda: {
						seeds: [
							{
								kind: 'const'
								value: [99, 108, 111, 115, 101, 95, 114, 101, 113, 117, 101, 115, 116, 115]
							},
							{
								kind: 'account'
								path: 'user'
							},
							{
								kind: 'arg'
								path: 'arg.token'
							},
							{
								kind: 'arg'
								path: 'arg.strategy_id'
							}
						]
					}
				},
				{
					name: 'userTokenAccount'
					docs: ['用户的代币账户（需要转账的代币）']
					writable: true
					pda: {
						seeds: [
							{
								kind: 'account'
								path: 'user'
							},
							{
								kind: 'account'
								path: 'tokenProgram'
							},
							{
								kind: 'account'
								path: 'mint'
							}
						]
						program: {
							kind: 'const'
							value: [
								140,
								151,
								37,
								143,
								78,
								36,
								137,
								241,
								187,
								61,
								16,
								41,
								20,
								142,
								13,
								131,
								11,
								90,
								19,
								153,
								218,
								255,
								16,
								132,
								4,
								142,
								123,
								216,
								219,
								233,
								248,
								89
							]
						}
					}
				},
				{
					name: 'programTokenAccount'
					docs: ['程序的代币账户（接收代币的 ATA）']
					writable: true
					pda: {
						seeds: [
							{
								kind: 'const'
								value: [116, 114, 101, 97, 115, 117, 114, 121]
							},
							{
								kind: 'account'
								path: 'mint'
							}
						]
					}
				},
				{
					name: 'mint'
				},
				{
					name: 'tokenProgram'
				},
				{
					name: 'user'
					docs: ['The user.']
					writable: true
					signer: true
				},
				{
					name: 'systemProgram'
					docs: ['The [System] program.']
					address: '11111111111111111111111111111111'
				},
				{
					name: 'rent'
					docs: ['The [Rent] program.']
					address: 'SysvarRent111111111111111111111111111111111'
				}
			]
			args: [
				{
					name: 'arg'
					type: {
						defined: {
							name: 'batchClaimArg'
						}
					}
				}
			]
		},
		{
			name: 'closeAll'
			discriminator: [222, 63, 176, 132, 200, 69, 45, 127]
			accounts: [
				{
					name: 'configure'
					docs: ['Global configuration']
					pda: {
						seeds: [
							{
								kind: 'const'
								value: [99, 111, 110, 102, 105, 103, 117, 114, 101]
							}
						]
					}
				},
				{
					name: 'vault'
					docs: ['Token Vault']
					pda: {
						seeds: [
							{
								kind: 'const'
								value: [118, 97, 117, 108, 116]
							},
							{
								kind: 'arg'
								path: 'arg.token'
							},
							{
								kind: 'arg'
								path: 'arg.strategy_id'
							}
						]
					}
				},
				{
					name: 'dailyInfo'
					docs: ['Daily Information']
					writable: true
					pda: {
						seeds: [
							{
								kind: 'const'
								value: [100, 97, 105, 108, 121, 95, 105, 110, 102, 111]
							},
							{
								kind: 'arg'
								path: 'arg.token'
							},
							{
								kind: 'arg'
								path: 'arg.strategy_id'
							},
							{
								kind: 'arg'
								path: 'arg.date_no'
							}
						]
					}
				},
				{
					name: 'totalInfo'
					docs: ['Total Information']
					writable: true
					pda: {
						seeds: [
							{
								kind: 'const'
								value: [116, 111, 116, 97, 108, 95, 105, 110, 102, 111]
							},
							{
								kind: 'arg'
								path: 'arg.token'
							},
							{
								kind: 'arg'
								path: 'arg.strategy_id'
							}
						]
					}
				},
				{
					name: 'openRequests'
					writable: true
					pda: {
						seeds: [
							{
								kind: 'const'
								value: [111, 112, 101, 110, 95, 114, 101, 113, 117, 101, 115, 116, 115]
							},
							{
								kind: 'account'
								path: 'user'
							},
							{
								kind: 'arg'
								path: 'arg.token'
							},
							{
								kind: 'arg'
								path: 'arg.strategy_id'
							}
						]
					}
				},
				{
					name: 'closeRequests'
					docs: ['Close Request']
					writable: true
					pda: {
						seeds: [
							{
								kind: 'const'
								value: [99, 108, 111, 115, 101, 95, 114, 101, 113, 117, 101, 115, 116, 115]
							},
							{
								kind: 'account'
								path: 'user'
							},
							{
								kind: 'arg'
								path: 'arg.token'
							},
							{
								kind: 'arg'
								path: 'arg.strategy_id'
							}
						]
					}
				},
				{
					name: 'user'
					docs: ['The user.']
					writable: true
					signer: true
				},
				{
					name: 'systemProgram'
					docs: ['The [System] program.']
					address: '11111111111111111111111111111111'
				},
				{
					name: 'rent'
					docs: ['The [Rent] program.']
					address: 'SysvarRent111111111111111111111111111111111'
				}
			]
			args: [
				{
					name: 'arg'
					type: {
						defined: {
							name: 'closeAllArg'
						}
					}
				}
			]
		},
		{
			name: 'fastClose'
			discriminator: [35, 249, 1, 182, 54, 214, 114, 218]
			accounts: [
				{
					name: 'configure'
					docs: ['Global configuration']
					pda: {
						seeds: [
							{
								kind: 'const'
								value: [99, 111, 110, 102, 105, 103, 117, 114, 101]
							}
						]
					}
				},
				{
					name: 'vault'
					docs: ['Token Vault']
					pda: {
						seeds: [
							{
								kind: 'const'
								value: [118, 97, 117, 108, 116]
							},
							{
								kind: 'arg'
								path: 'arg.token'
							},
							{
								kind: 'arg'
								path: 'arg.strategy_id'
							}
						]
					}
				},
				{
					name: 'dailyInfo'
					docs: ['Daily Information']
					writable: true
					pda: {
						seeds: [
							{
								kind: 'const'
								value: [100, 97, 105, 108, 121, 95, 105, 110, 102, 111]
							},
							{
								kind: 'arg'
								path: 'arg.token'
							},
							{
								kind: 'arg'
								path: 'arg.strategy_id'
							},
							{
								kind: 'arg'
								path: 'arg.date_no'
							}
						]
					}
				},
				{
					name: 'totalInfo'
					docs: ['Total Information']
					writable: true
					pda: {
						seeds: [
							{
								kind: 'const'
								value: [116, 111, 116, 97, 108, 95, 105, 110, 102, 111]
							},
							{
								kind: 'arg'
								path: 'arg.token'
							},
							{
								kind: 'arg'
								path: 'arg.strategy_id'
							}
						]
					}
				},
				{
					name: 'openRequests'
					writable: true
					pda: {
						seeds: [
							{
								kind: 'const'
								value: [111, 112, 101, 110, 95, 114, 101, 113, 117, 101, 115, 116, 115]
							},
							{
								kind: 'account'
								path: 'user'
							},
							{
								kind: 'arg'
								path: 'arg.token'
							},
							{
								kind: 'arg'
								path: 'arg.strategy_id'
							}
						]
					}
				},
				{
					name: 'closeRequests'
					docs: ['Close Request']
					writable: true
					pda: {
						seeds: [
							{
								kind: 'const'
								value: [99, 108, 111, 115, 101, 95, 114, 101, 113, 117, 101, 115, 116, 115]
							},
							{
								kind: 'account'
								path: 'user'
							},
							{
								kind: 'arg'
								path: 'arg.token'
							},
							{
								kind: 'arg'
								path: 'arg.strategy_id'
							}
						]
					}
				},
				{
					name: 'user'
					docs: ['The user.']
					writable: true
					signer: true
				},
				{
					name: 'systemProgram'
					docs: ['The [System] program.']
					address: '11111111111111111111111111111111'
				},
				{
					name: 'rent'
					docs: ['The [Rent] program.']
					address: 'SysvarRent111111111111111111111111111111111'
				}
			]
			args: [
				{
					name: 'arg'
					type: {
						defined: {
							name: 'fastCloseArg'
						}
					}
				}
			]
		},
		{
			name: 'initialize'
			discriminator: [175, 175, 109, 31, 13, 152, 155, 237]
			accounts: [
				{
					name: 'configure'
					docs: ['Global configuration']
					writable: true
					pda: {
						seeds: [
							{
								kind: 'const'
								value: [99, 111, 110, 102, 105, 103, 117, 114, 101]
							}
						]
					}
				},
				{
					name: 'user'
					docs: ['The user.']
					writable: true
					signer: true
				},
				{
					name: 'systemProgram'
					docs: ['The [System] program.']
					address: '11111111111111111111111111111111'
				},
				{
					name: 'rent'
					docs: ['The [Rent] program.']
					address: 'SysvarRent111111111111111111111111111111111'
				}
			]
			args: [
				{
					name: 'arg'
					type: {
						defined: {
							name: 'initializeArg'
						}
					}
				}
			]
		},
		{
			name: 'normalClose'
			discriminator: [196, 124, 154, 190, 159, 139, 127, 223]
			accounts: [
				{
					name: 'configure'
					docs: ['Global configuration']
					pda: {
						seeds: [
							{
								kind: 'const'
								value: [99, 111, 110, 102, 105, 103, 117, 114, 101]
							}
						]
					}
				},
				{
					name: 'vault'
					docs: ['Token Vault']
					pda: {
						seeds: [
							{
								kind: 'const'
								value: [118, 97, 117, 108, 116]
							},
							{
								kind: 'arg'
								path: 'arg.token'
							},
							{
								kind: 'arg'
								path: 'arg.strategy_id'
							}
						]
					}
				},
				{
					name: 'dailyInfo'
					docs: ['Daily Information']
					writable: true
					pda: {
						seeds: [
							{
								kind: 'const'
								value: [100, 97, 105, 108, 121, 95, 105, 110, 102, 111]
							},
							{
								kind: 'arg'
								path: 'arg.token'
							},
							{
								kind: 'arg'
								path: 'arg.strategy_id'
							},
							{
								kind: 'arg'
								path: 'arg.date_no'
							}
						]
					}
				},
				{
					name: 'totalInfo'
					docs: ['Total Information']
					writable: true
					pda: {
						seeds: [
							{
								kind: 'const'
								value: [116, 111, 116, 97, 108, 95, 105, 110, 102, 111]
							},
							{
								kind: 'arg'
								path: 'arg.token'
							},
							{
								kind: 'arg'
								path: 'arg.strategy_id'
							}
						]
					}
				},
				{
					name: 'openRequests'
					writable: true
					pda: {
						seeds: [
							{
								kind: 'const'
								value: [111, 112, 101, 110, 95, 114, 101, 113, 117, 101, 115, 116, 115]
							},
							{
								kind: 'account'
								path: 'user'
							},
							{
								kind: 'arg'
								path: 'arg.token'
							},
							{
								kind: 'arg'
								path: 'arg.strategy_id'
							}
						]
					}
				},
				{
					name: 'closeRequests'
					docs: ['Close Request']
					writable: true
					pda: {
						seeds: [
							{
								kind: 'const'
								value: [99, 108, 111, 115, 101, 95, 114, 101, 113, 117, 101, 115, 116, 115]
							},
							{
								kind: 'account'
								path: 'user'
							},
							{
								kind: 'arg'
								path: 'arg.token'
							},
							{
								kind: 'arg'
								path: 'arg.strategy_id'
							}
						]
					}
				},
				{
					name: 'user'
					docs: ['The user.']
					writable: true
					signer: true
				},
				{
					name: 'systemProgram'
					docs: ['The [System] program.']
					address: '11111111111111111111111111111111'
				},
				{
					name: 'rent'
					docs: ['The [Rent] program.']
					address: 'SysvarRent111111111111111111111111111111111'
				}
			]
			args: [
				{
					name: 'arg'
					type: {
						defined: {
							name: 'normalCloseArg'
						}
					}
				}
			]
		},
		{
			name: 'open'
			discriminator: [228, 220, 155, 71, 199, 189, 60, 45]
			accounts: [
				{
					name: 'configure'
					docs: ['Global configuration']
					pda: {
						seeds: [
							{
								kind: 'const'
								value: [99, 111, 110, 102, 105, 103, 117, 114, 101]
							}
						]
					}
				},
				{
					name: 'vault'
					docs: ['Token Vault']
					pda: {
						seeds: [
							{
								kind: 'const'
								value: [118, 97, 117, 108, 116]
							},
							{
								kind: 'arg'
								path: 'arg.token'
							},
							{
								kind: 'arg'
								path: 'arg.strategy_id'
							}
						]
					}
				},
				{
					name: 'dailyInfo'
					docs: ['Daily Information']
					writable: true
					pda: {
						seeds: [
							{
								kind: 'const'
								value: [100, 97, 105, 108, 121, 95, 105, 110, 102, 111]
							},
							{
								kind: 'arg'
								path: 'arg.token'
							},
							{
								kind: 'arg'
								path: 'arg.strategy_id'
							},
							{
								kind: 'arg'
								path: 'arg.date_no'
							}
						]
					}
				},
				{
					name: 'openRequests'
					writable: true
					pda: {
						seeds: [
							{
								kind: 'const'
								value: [111, 112, 101, 110, 95, 114, 101, 113, 117, 101, 115, 116, 115]
							},
							{
								kind: 'account'
								path: 'user'
							},
							{
								kind: 'arg'
								path: 'arg.token'
							},
							{
								kind: 'arg'
								path: 'arg.strategy_id'
							}
						]
					}
				},
				{
					name: 'userTokenAccount'
					docs: ['用户的代币账户（需要转账的代币）']
					writable: true
					pda: {
						seeds: [
							{
								kind: 'account'
								path: 'user'
							},
							{
								kind: 'account'
								path: 'tokenProgram'
							},
							{
								kind: 'account'
								path: 'mint'
							}
						]
						program: {
							kind: 'const'
							value: [
								140,
								151,
								37,
								143,
								78,
								36,
								137,
								241,
								187,
								61,
								16,
								41,
								20,
								142,
								13,
								131,
								11,
								90,
								19,
								153,
								218,
								255,
								16,
								132,
								4,
								142,
								123,
								216,
								219,
								233,
								248,
								89
							]
						}
					}
				},
				{
					name: 'programTokenAccount'
					docs: ['程序的代币账户（接收代币的 ATA）']
					writable: true
					pda: {
						seeds: [
							{
								kind: 'const'
								value: [116, 114, 101, 97, 115, 117, 114, 121]
							},
							{
								kind: 'account'
								path: 'mint'
							}
						]
					}
				},
				{
					name: 'mint'
				},
				{
					name: 'tokenProgram'
				},
				{
					name: 'user'
					docs: ['The user.']
					writable: true
					signer: true
				},
				{
					name: 'systemProgram'
					docs: ['The [System] program.']
					address: '11111111111111111111111111111111'
				},
				{
					name: 'rent'
					docs: ['The [Rent] program.']
					address: 'SysvarRent111111111111111111111111111111111'
				}
			]
			args: [
				{
					name: 'arg'
					type: {
						defined: {
							name: 'openArg'
						}
					}
				}
			]
		},
		{
			name: 'rebaseWithLimit'
			discriminator: [221, 52, 206, 56, 167, 28, 250, 35]
			accounts: [
				{
					name: 'configure'
					docs: ['Global configuration']
				},
				{
					name: 'vault'
					docs: ['Token Vault']
					pda: {
						seeds: [
							{
								kind: 'const'
								value: [118, 97, 117, 108, 116]
							},
							{
								kind: 'arg'
								path: 'arg.token'
							},
							{
								kind: 'arg'
								path: 'arg.strategy_id'
							}
						]
					}
				},
				{
					name: 'prevDailyInfo'
					docs: ['Previous Daily Information']
				},
				{
					name: 'dailyInfo'
					docs: ['Daily Information']
					writable: true
					pda: {
						seeds: [
							{
								kind: 'const'
								value: [100, 97, 105, 108, 121, 95, 105, 110, 102, 111]
							},
							{
								kind: 'arg'
								path: 'arg.token'
							},
							{
								kind: 'arg'
								path: 'arg.strategy_id'
							},
							{
								kind: 'arg'
								path: 'arg.date_no'
							}
						]
					}
				},
				{
					name: 'totalInfo'
					docs: ['Total Information']
					writable: true
					pda: {
						seeds: [
							{
								kind: 'const'
								value: [116, 111, 116, 97, 108, 95, 105, 110, 102, 111]
							},
							{
								kind: 'arg'
								path: 'arg.token'
							},
							{
								kind: 'arg'
								path: 'arg.strategy_id'
							}
						]
					}
				},
				{
					name: 'user'
					docs: ['The user.']
					writable: true
					signer: true
				},
				{
					name: 'systemProgram'
					docs: ['The [System] program.']
					address: '11111111111111111111111111111111'
				},
				{
					name: 'rent'
					docs: ['The [Rent] program.']
					address: 'SysvarRent111111111111111111111111111111111'
				}
			]
			args: [
				{
					name: 'arg'
					type: {
						defined: {
							name: 'rebaseArg'
						}
					}
				}
			]
		},
		{
			name: 'rebaseWithoutLimit'
			discriminator: [144, 50, 74, 197, 71, 74, 17, 38]
			accounts: [
				{
					name: 'configure'
					docs: ['Global configuration']
				},
				{
					name: 'vault'
					docs: ['Token Vault']
					pda: {
						seeds: [
							{
								kind: 'const'
								value: [118, 97, 117, 108, 116]
							},
							{
								kind: 'arg'
								path: 'arg.token'
							},
							{
								kind: 'arg'
								path: 'arg.strategy_id'
							}
						]
					}
				},
				{
					name: 'prevDailyInfo'
					docs: ['Previous Daily Information']
				},
				{
					name: 'dailyInfo'
					docs: ['Daily Information']
					writable: true
					pda: {
						seeds: [
							{
								kind: 'const'
								value: [100, 97, 105, 108, 121, 95, 105, 110, 102, 111]
							},
							{
								kind: 'arg'
								path: 'arg.token'
							},
							{
								kind: 'arg'
								path: 'arg.strategy_id'
							},
							{
								kind: 'arg'
								path: 'arg.date_no'
							}
						]
					}
				},
				{
					name: 'totalInfo'
					docs: ['Total Information']
					writable: true
					pda: {
						seeds: [
							{
								kind: 'const'
								value: [116, 111, 116, 97, 108, 95, 105, 110, 102, 111]
							},
							{
								kind: 'arg'
								path: 'arg.token'
							},
							{
								kind: 'arg'
								path: 'arg.strategy_id'
							}
						]
					}
				},
				{
					name: 'user'
					docs: ['The user.']
					writable: true
					signer: true
				},
				{
					name: 'systemProgram'
					docs: ['The [System] program.']
					address: '11111111111111111111111111111111'
				},
				{
					name: 'rent'
					docs: ['The [Rent] program.']
					address: 'SysvarRent111111111111111111111111111111111'
				}
			]
			args: [
				{
					name: 'arg'
					type: {
						defined: {
							name: 'rebaseArg'
						}
					}
				}
			]
		},
		{
			name: 'registerVault'
			discriminator: [121, 62, 4, 122, 93, 231, 119, 49]
			accounts: [
				{
					name: 'configure'
					docs: ['Global configuration']
					pda: {
						seeds: [
							{
								kind: 'const'
								value: [99, 111, 110, 102, 105, 103, 117, 114, 101]
							}
						]
					}
				},
				{
					name: 'vault'
					docs: ['Token Vault']
					writable: true
					pda: {
						seeds: [
							{
								kind: 'const'
								value: [118, 97, 117, 108, 116]
							},
							{
								kind: 'account'
								path: 'tokenAddress'
							},
							{
								kind: 'arg'
								path: 'arg.strategy_id'
							}
						]
					}
				},
				{
					name: 'tokenAddress'
					docs: ['Token address']
				},
				{
					name: 'user'
					docs: ['The user.']
					writable: true
					signer: true
				},
				{
					name: 'systemProgram'
					docs: ['The [System] program.']
					address: '11111111111111111111111111111111'
				},
				{
					name: 'rent'
					docs: ['The [Rent] program.']
					address: 'SysvarRent111111111111111111111111111111111'
				}
			]
			args: [
				{
					name: 'arg'
					type: {
						defined: {
							name: 'registerVaultArg'
						}
					}
				}
			]
		}
	]
	accounts: [
		{
			name: 'closeRequests'
			discriminator: [72, 24, 42, 105, 215, 85, 13, 164]
		},
		{
			name: 'configure'
			discriminator: [203, 61, 5, 203, 76, 241, 174, 6]
		},
		{
			name: 'dailyInfo'
			discriminator: [241, 53, 100, 51, 78, 232, 177, 254]
		},
		{
			name: 'openRequests'
			discriminator: [216, 148, 224, 127, 28, 21, 217, 78]
		},
		{
			name: 'totalInfo'
			discriminator: [169, 31, 225, 174, 83, 54, 210, 113]
		},
		{
			name: 'vault'
			discriminator: [211, 8, 232, 43, 2, 152, 117, 119]
		}
	]
	events: [
		{
			name: 'claimed'
			discriminator: [217, 192, 123, 72, 108, 150, 248, 33]
		},
		{
			name: 'fastClosed'
			discriminator: [234, 112, 166, 198, 148, 100, 100, 34]
		},
		{
			name: 'feeRateSet'
			discriminator: [122, 135, 53, 85, 40, 42, 251, 192]
		},
		{
			name: 'feeReceiverSet'
			discriminator: [93, 36, 93, 45, 178, 182, 191, 232]
		},
		{
			name: 'forwardToSet'
			discriminator: [192, 147, 158, 218, 152, 140, 222, 161]
		},
		{
			name: 'initialized'
			discriminator: [208, 213, 115, 98, 115, 82, 201, 209]
		},
		{
			name: 'normalClosed'
			discriminator: [13, 197, 233, 63, 85, 244, 14, 172]
		},
		{
			name: 'opened'
			discriminator: [166, 172, 97, 9, 77, 76, 189, 109]
		},
		{
			name: 'rebaseOperatorSet'
			discriminator: [126, 100, 218, 130, 64, 214, 95, 20]
		},
		{
			name: 'rebaseRateLimitSet'
			discriminator: [70, 209, 231, 167, 91, 113, 78, 198]
		},
		{
			name: 'rebased'
			discriminator: [191, 57, 120, 100, 252, 208, 74, 136]
		},
		{
			name: 'vaultRegistered'
			discriminator: [215, 55, 28, 170, 12, 58, 41, 93]
		}
	]
	errors: [
		{
			code: 6000
			name: 'amountTooSmall'
			msg: 'The amount is too small'
		},
		{
			code: 6001
			name: 'invalidAuthority'
			msg: 'Authority is not valid'
		},
		{
			code: 6002
			name: 'invalidDateNo'
			msg: 'Invalid date number'
		},
		{
			code: 6003
			name: 'exceedMaxValue'
			msg: 'Exceed maximum value'
		},
		{
			code: 6004
			name: 'functionDisabled'
			msg: 'The function is disabled'
		},
		{
			code: 6005
			name: 'rebaseExceedLimit'
			msg: 'Rebase exceeds limit'
		},
		{
			code: 6006
			name: 'requestAmountTooLarge'
			msg: 'Request amount too large'
		},
		{
			code: 6007
			name: 'someElementNotMatch'
			msg: 'Some element not match'
		},
		{
			code: 6008
			name: 'vaultDisabled'
			msg: 'The vault is disabled'
		}
	]
	types: [
		{
			name: 'batchClaimArg'
			type: {
				kind: 'struct'
				fields: [
					{
						name: 'token'
						type: 'pubkey'
					},
					{
						name: 'strategyId'
						type: 'u16'
					},
					{
						name: 'dateNo'
						type: 'u32'
					},
					{
						name: 'closeIds'
						type: {
							vec: 'u64'
						}
					}
				]
			}
		},
		{
			name: 'claimed'
			type: {
				kind: 'struct'
				fields: [
					{
						name: 'token'
						type: 'pubkey'
					},
					{
						name: 'strategyId'
						type: 'u16'
					},
					{
						name: 'account'
						type: 'pubkey'
					},
					{
						name: 'dateNo'
						type: 'u32'
					},
					{
						name: 'closeId'
						type: 'u64'
					},
					{
						name: 'assets'
						type: 'u64'
					},
					{
						name: 'fee'
						type: 'u64'
					}
				]
			}
		},
		{
			name: 'closeAllArg'
			type: {
				kind: 'struct'
				fields: [
					{
						name: 'token'
						type: 'pubkey'
					},
					{
						name: 'strategyId'
						type: 'u16'
					},
					{
						name: 'dateNo'
						type: 'u32'
					}
				]
			}
		},
		{
			name: 'closeRequest'
			type: {
				kind: 'struct'
				fields: [
					{
						name: 'id'
						type: 'u64'
					},
					{
						name: 'assets'
						type: 'u64'
					},
					{
						name: 'fee'
						type: 'u64'
					},
					{
						name: 'pendingUntil'
						type: 'u32'
					}
				]
			}
		},
		{
			name: 'closeRequests'
			type: {
				kind: 'struct'
				fields: [
					{
						name: 'items'
						type: {
							vec: {
								defined: {
									name: 'closeRequest'
								}
							}
						}
					}
				]
			}
		},
		{
			name: 'configure'
			type: {
				kind: 'struct'
				fields: [
					{
						name: 'authority'
						type: 'pubkey'
					},
					{
						name: 'rebaseOperator'
						type: 'pubkey'
					},
					{
						name: 'forwardTo'
						type: 'pubkey'
					},
					{
						name: 'feeRecipient'
						type: 'pubkey'
					},
					{
						name: 'feeRate'
						type: 'u64'
					},
					{
						name: 'rebaseRateLimit'
						type: 'u64'
					}
				]
			}
		},
		{
			name: 'dailyInfo'
			type: {
				kind: 'struct'
				fields: [
					{
						name: 'pendingStakes'
						type: 'u64'
					},
					{
						name: 'stakes'
						type: 'u64'
					},
					{
						name: 'shares'
						type: 'u64'
					},
					{
						name: 'rewards'
						type: 'u64'
					}
				]
			}
		},
		{
			name: 'fastCloseArg'
			type: {
				kind: 'struct'
				fields: [
					{
						name: 'token'
						type: 'pubkey'
					},
					{
						name: 'strategyId'
						type: 'u16'
					},
					{
						name: 'dateNo'
						type: 'u32'
					},
					{
						name: 'closeRequestId'
						type: 'u64'
					}
				]
			}
		},
		{
			name: 'fastClosed'
			type: {
				kind: 'struct'
				fields: [
					{
						name: 'token'
						type: 'pubkey'
					},
					{
						name: 'strategyId'
						type: 'u16'
					},
					{
						name: 'account'
						type: 'pubkey'
					},
					{
						name: 'dateNo'
						type: 'u32'
					},
					{
						name: 'clearingDateNo'
						type: 'u32'
					},
					{
						name: 'assets'
						type: 'u64'
					},
					{
						name: 'shares'
						type: 'u64'
					},
					{
						name: 'fee'
						type: 'u64'
					},
					{
						name: 'principal'
						type: 'u64'
					}
				]
			}
		},
		{
			name: 'feeRateSet'
			type: {
				kind: 'struct'
				fields: [
					{
						name: 'account'
						type: 'pubkey'
					},
					{
						name: 'feeRate'
						type: 'u64'
					}
				]
			}
		},
		{
			name: 'feeReceiverSet'
			type: {
				kind: 'struct'
				fields: [
					{
						name: 'account'
						type: 'pubkey'
					},
					{
						name: 'feeRecipient'
						type: 'pubkey'
					}
				]
			}
		},
		{
			name: 'forwardToSet'
			type: {
				kind: 'struct'
				fields: [
					{
						name: 'account'
						type: 'pubkey'
					},
					{
						name: 'forwardTo'
						type: 'pubkey'
					}
				]
			}
		},
		{
			name: 'initializeArg'
			type: {
				kind: 'struct'
				fields: [
					{
						name: 'authority'
						type: 'pubkey'
					},
					{
						name: 'rebaseOperator'
						type: 'pubkey'
					},
					{
						name: 'forwardTo'
						type: 'pubkey'
					},
					{
						name: 'feeRecipient'
						type: 'pubkey'
					},
					{
						name: 'feeRate'
						type: 'u64'
					},
					{
						name: 'rebaseRateLimit'
						type: 'u64'
					}
				]
			}
		},
		{
			name: 'initialized'
			type: {
				kind: 'struct'
				fields: [
					{
						name: 'account'
						type: 'pubkey'
					},
					{
						name: 'authority'
						type: 'pubkey'
					}
				]
			}
		},
		{
			name: 'normalCloseArg'
			type: {
				kind: 'struct'
				fields: [
					{
						name: 'token'
						type: 'pubkey'
					},
					{
						name: 'strategyId'
						type: 'u16'
					},
					{
						name: 'dateNo'
						type: 'u32'
					},
					{
						name: 'shares'
						type: 'u64'
					},
					{
						name: 'closeRequestId'
						type: 'u64'
					}
				]
			}
		},
		{
			name: 'normalClosed'
			type: {
				kind: 'struct'
				fields: [
					{
						name: 'token'
						type: 'pubkey'
					},
					{
						name: 'strategyId'
						type: 'u16'
					},
					{
						name: 'account'
						type: 'pubkey'
					},
					{
						name: 'dateNo'
						type: 'u32'
					},
					{
						name: 'clearingDateNo'
						type: 'u32'
					},
					{
						name: 'assets'
						type: 'u64'
					},
					{
						name: 'shares'
						type: 'u64'
					}
				]
			}
		},
		{
			name: 'openArg'
			type: {
				kind: 'struct'
				fields: [
					{
						name: 'token'
						type: 'pubkey'
					},
					{
						name: 'strategyId'
						type: 'u16'
					},
					{
						name: 'dateNo'
						type: 'u32'
					},
					{
						name: 'assets'
						type: 'u64'
					}
				]
			}
		},
		{
			name: 'openRequest'
			type: {
				kind: 'struct'
				fields: [
					{
						name: 'principal'
						type: 'u64'
					},
					{
						name: 'closedShares'
						type: 'u64'
					},
					{
						name: 'pendingUntilDateNo'
						type: 'u32'
					},
					{
						name: 'createDateNo'
						type: 'u32'
					},
					{
						name: 'openDateNo'
						type: 'u32'
					}
				]
			}
		},
		{
			name: 'openRequests'
			type: {
				kind: 'struct'
				fields: [
					{
						name: 'items'
						type: {
							vec: {
								defined: {
									name: 'openRequest'
								}
							}
						}
					}
				]
			}
		},
		{
			name: 'opened'
			type: {
				kind: 'struct'
				fields: [
					{
						name: 'token'
						type: 'pubkey'
					},
					{
						name: 'strategyId'
						type: 'u16'
					},
					{
						name: 'account'
						type: 'pubkey'
					},
					{
						name: 'createDateNo'
						type: 'u32'
					},
					{
						name: 'openDateNo'
						type: 'u32'
					},
					{
						name: 'assets'
						type: 'u64'
					}
				]
			}
		},
		{
			name: 'rebaseArg'
			type: {
				kind: 'struct'
				fields: [
					{
						name: 'token'
						type: 'pubkey'
					},
					{
						name: 'strategyId'
						type: 'u16'
					},
					{
						name: 'dateNo'
						type: 'u32'
					},
					{
						name: 'rewards'
						type: 'u64'
					}
				]
			}
		},
		{
			name: 'rebaseOperatorSet'
			type: {
				kind: 'struct'
				fields: [
					{
						name: 'account'
						type: 'pubkey'
					},
					{
						name: 'rebaseOperator'
						type: 'pubkey'
					}
				]
			}
		},
		{
			name: 'rebaseRateLimitSet'
			type: {
				kind: 'struct'
				fields: [
					{
						name: 'account'
						type: 'pubkey'
					},
					{
						name: 'rebaseRateLimit'
						type: 'u64'
					}
				]
			}
		},
		{
			name: 'rebased'
			type: {
				kind: 'struct'
				fields: [
					{
						name: 'token'
						type: 'pubkey'
					},
					{
						name: 'strategyId'
						type: 'u16'
					},
					{
						name: 'account'
						type: 'pubkey'
					},
					{
						name: 'dateNo'
						type: 'u32'
					},
					{
						name: 'rewards'
						type: 'u64'
					},
					{
						name: 'totalStakes'
						type: 'u64'
					},
					{
						name: 'totalShares'
						type: 'u64'
					},
					{
						name: 'totalReward'
						type: 'u64'
					}
				]
			}
		},
		{
			name: 'registerVaultArg'
			type: {
				kind: 'struct'
				fields: [
					{
						name: 'strategyId'
						type: 'u16'
					},
					{
						name: 'openCooldownDays'
						type: 'u32'
					},
					{
						name: 'openDateOffset'
						type: 'u32'
					},
					{
						name: 'minimalAmount'
						type: 'u64'
					}
				]
			}
		},
		{
			name: 'totalInfo'
			type: {
				kind: 'struct'
				fields: [
					{
						name: 'stakes'
						type: 'u64'
					},
					{
						name: 'shares'
						type: 'u64'
					},
					{
						name: 'rewards'
						type: 'u64'
					}
				]
			}
		},
		{
			name: 'vault'
			type: {
				kind: 'struct'
				fields: [
					{
						name: 'isVaultEnable'
						type: 'bool'
					},
					{
						name: 'isOpenEnable'
						type: 'bool'
					},
					{
						name: 'isNormalCloseEnable'
						type: 'bool'
					},
					{
						name: 'isFastCloseEnable'
						type: 'bool'
					},
					{
						name: 'isClaimEnable'
						type: 'bool'
					},
					{
						name: 'openCooldownDays'
						type: 'u32'
					},
					{
						name: 'openDateOffset'
						type: 'u32'
					},
					{
						name: 'clearingDateNo'
						type: 'u32'
					},
					{
						name: 'minimalAmount'
						type: 'u64'
					}
				]
			}
		},
		{
			name: 'vaultRegistered'
			type: {
				kind: 'struct'
				fields: [
					{
						name: 'account'
						type: 'pubkey'
					},
					{
						name: 'tokenAddress'
						type: 'pubkey'
					},
					{
						name: 'strategyId'
						type: 'u16'
					},
					{
						name: 'openCooldownDays'
						type: 'u32'
					},
					{
						name: 'openDateOffset'
						type: 'u32'
					},
					{
						name: 'minimalAmount'
						type: 'u64'
					}
				]
			}
		}
	]
	constants: [
		{
			name: 'dateNoOffset'
			type: 'u32'
			value: '14400'
		},
		{
			name: 'maxCloseRequestSize'
			type: 'u16'
			value: '10'
		},
		{
			name: 'maxOpenRequestSize'
			type: 'u16'
			value: '10'
		},
		{
			name: 'maxRateDenominator'
			type: 'u64'
			value: '1000000'
		},
		{
			name: 'oneDaySeconds'
			type: 'u32'
			value: '86400'
		},
		{
			name: 'pendingUntilClaimOffset'
			type: 'u64'
			value: '36000'
		},
		{
			name: 'pendingUntilCloseOffset'
			type: 'u64'
			value: '14400'
		},
		{
			name: 'requestIdOffset'
			type: 'u64'
			value: '100000000'
		},
		{
			name: 'strategyAutoId'
			type: 'u64'
			value: '1'
		},
		{
			name: 'strategyFixId'
			type: 'u64'
			value: '2'
		},
		{
			name: 'strategyManualStartId'
			type: 'u64'
			value: '10'
		}
	]
}
