import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";
import { TestBed } from "@angular/core/testing";

describe('CalculatorService', () => {

  let calculator:CalculatorService,
  loggerSpy:any

  beforeEach(() => {
    console.log('Calling beforeEach')
    loggerSpy = jasmine.createSpyObj('LoggerService',['log'])

    TestBed.configureTestingModule(
      {
       providers: [
        CalculatorService,
        {
          provide: LoggerService, useValue: loggerSpy
        }
       ]
      }
    )
    calculator = TestBed.inject(CalculatorService)
  });

  it('should add two numbers', () => {
    console.log('adding test.')
    const result = calculator.add(2, 5)
    expect(result).toBe(7)
    expect(loggerSpy.log).toHaveBeenCalledTimes(2)
  });

  it('show substract two numbers', () => {
    console.log('substract test.')
    const result = calculator.subtract(5, 2)
    expect(result).toBe(3,"unexpected substraction result")
    expect(loggerSpy.log).toHaveBeenCalledTimes(1)
  });

})


