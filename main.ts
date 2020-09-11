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
    //% weight=120 blockId="motor_fn" block="Set Motor|position %pos|direction %dir|speed %speed"
    //% speed.min=0 speed.max=1023
    export function motor_fn(pos: MotorLocation, dir: MotorDir, speed: number):void {
        let ctrl_0 = 0;
	let ctrl_1 = 0;
          		
	if(dir == MotorDir.CW) {
		ctrl_0 = speed;
	} else {
		ctrl_1 = speed;			
	}
		
	if (pos == MotorLocation.M1 ) {
        	pins.analogWritePin(AnalogPin.P16, ctrl_0);
          	pins.analogWritePin(AnalogPin.P15, ctrl_1);
	}
	if ( pos == MotorLocation.M2 ) {
        	pins.analogWritePin(AnalogPin.P14, ctrl_0);
          	pins.analogWritePin(AnalogPin.P13, ctrl_1);			
	}
		
	if ( pos == MotorLocation.M3 ) {
         	pins.analogWritePin(AnalogPin.P12, ctrl_0);
         	pins.analogWritePin(AnalogPin.P11, ctrl_1);			
	}
		
	if ( pos == MotorLocation.M4 ) {
        	pins.analogWritePin(AnalogPin.P10, ctrl_0);
          	pins.analogWritePin(AnalogPin.P9, ctrl_1);		
	}	
    }
}
