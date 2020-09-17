/*
 fio5 package
*/

//% weight=10 color=#3CB371 icon="\uf1b9" blockId="fio5" block="fio5"
namespace fio5 {
	export enum MotorLocation {
		M1 = 0x01,
		M2 = 0x02,
		M3 = 0x03,
		M4 = 0x04
	}

	export enum MotorDir {
		CW = 0x01,
		CCW = 0x02
	}

	export enum LampPosition {
		O1 = 0x01,
		O2 = 0x02,
		O3 = 0x03,
		O4 = 0x04,
		O5 = 0x05,
		O6 = 0x06,
		O7 = 0x07,
		O8 = 0x08	
	}

	export enum Switch {
		OFF = 0x00,
		ON = 0x01
	}
/*
	export enum ButtonName {
		A = 0x00,
		B = 0x01,
		AB = 0x02
	}
*/
	export enum ButtonStatus {
		OFF = 0x00,
		ON= 0x01
	}

    /** 
	* Set Motor
	*/
    //% weight=120 blockId="SetMotor" block="SetMotor|position %pos|direction %dir|speed %speed"
    //% speed.min=0 speed.max=1023
    export function SetMotor(pos: MotorLocation, dir: MotorDir, speed: number):void {
		let ctrl_0 = 0;
		let ctrl_1 = 0;
					
		if(MotorDir.CW == dir) {
			ctrl_0 = speed;
			ctrl_1 = 0;
		} else {
			ctrl_0 = 0;
			ctrl_1 = speed;			
		}
			
		if (MotorLocation.M1 == pos) {
				pins.analogWritePin(AnalogPin.P16, ctrl_0);
				pins.analogWritePin(AnalogPin.P15, ctrl_1);
		}
		if (MotorLocation.M2 == pos) {
				pins.analogWritePin(AnalogPin.P14, ctrl_0);
				pins.analogWritePin(AnalogPin.P13, ctrl_1);			
		}
			
		if (MotorLocation.M3 == pos) {
				pins.analogWritePin(AnalogPin.P12, ctrl_0);
				pins.analogWritePin(AnalogPin.P10, ctrl_1);			
		}
			
		if (MotorLocation.M4 == pos ) {
				pins.analogWritePin(AnalogPin.P9, ctrl_0);
				pins.analogWritePin(AnalogPin.P8, ctrl_1);		
		} 
	}

    /** 
	* Set Lamp
	*/
    //% weight=120 blockId="SetLamp" block="SetLamp|position %pos|switch %status"	
    export function SetLamp(pos: LampPosition, status: Switch):void {
		
		switch(pos) {
			case LampPosition.O1:
				pins.digitalWritePin(DigitalPin.P16, status)
				break;
			case LampPosition.O2:
				pins.digitalWritePin(DigitalPin.P15, status)
				break;				
			case LampPosition.O3:
				pins.digitalWritePin(DigitalPin.P14, status)
				break;
			case LampPosition.O4:
				pins.digitalWritePin(DigitalPin.P13, status)
				break;
			case LampPosition.O5:
				pins.digitalWritePin(DigitalPin.P12, status)
				break;
			case LampPosition.O6:
				pins.digitalWritePin(DigitalPin.P10, status)
				break;				
			case LampPosition.O7:
				pins.digitalWritePin(DigitalPin.P9, status)
				break;
			case LampPosition.O8:
				pins.digitalWritePin(DigitalPin.P8, status)
				break;
			default:
				break;			
		}
	}
	
    /** 
	* Until Button Press
	*/
    //% weight=120 blockId="UntilButtonPress" block="Until Button Press|Button %button|Status %status"	
    export function UntilButtonPress(button: Button, status: ButtonStatus):void {		
		while (true) {
			if ( status == input.buttonIsPressed(button) ) {
				basic.showString("Huu!")
				break;
			}
		}
    }		
}
