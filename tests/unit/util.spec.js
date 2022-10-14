import {sliceCircularArray} from "../../src/util/util";

describe('sliceCircularArray test suite', ()=>{
  test('non-array', () => {
    expect(sliceCircularArray(1, 2, 2)).toEqual([])
    expect(sliceCircularArray(undefined, 2, 2)).toEqual([])
    expect(sliceCircularArray(null, 2, 2)).toEqual([])
  });

  test('[1,2,3,4,5]', () => {
    const src = [1,2,3,4,5]
    expect(sliceCircularArray(src, -2, 2)).toEqual([4,5])
    expect(sliceCircularArray(src, 2, 2)).toEqual([3,4])
    expect(sliceCircularArray(src, 7, 2)).toEqual([3,4])
  });

  test('size > array.length', () => {
    const src = [1,2,3,4,5]
    expect(sliceCircularArray(src, -2, 12)).toEqual([4,5,1,2,3])
    expect(sliceCircularArray(src, 2, 12)).toEqual([3,4,5,1,2])
    expect(sliceCircularArray(src, 7, 12)).toEqual([3,4,5,1,2])
  });

  test('size is negative', () => {
    const src = [1,2,3,4,5]
    expect(sliceCircularArray([], -2, -2)).toEqual([])
    expect(sliceCircularArray(src, -2, -2)).toEqual([2,3])
    expect(sliceCircularArray(src, 2, -4)).toEqual([4,5,1,2])
    expect(sliceCircularArray(src, 7, -12)).toEqual([3,4,5,1,2])
  });
})
