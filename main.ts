/*
 fio5 package
*/

//% weight=10 color=#3CB371 icon="\uf1b9"
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
         	pins.analogWritePin(AnalogPin.P11, ctrl_1);			
	}
		
	if (MotorLocation.M4 == pos ) {
        	pins.analogWritePin(AnalogPin.P10, ctrl_0);
          	pins.analogWritePin(AnalogPin.P9, ctrl_1);		
	} 
    }
}
