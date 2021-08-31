import React from 'react';
export function getBubbleSortAnimations(array) {
    let animations  = [];
    let auxillaryArray = array.slice();
    bubbleSort(auxillaryArray, animations);
    const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
    console.log("sort works correctly? ",arraysAreEqual(javaScriptSortedArray, auxillaryArray));
    array = auxillaryArray;
    return [animations, array];
}

function bubbleSort(auxillaryArray, animations) {
    const N = auxillaryArray.length;
    let iters = N - 1;
    while(iters > 0) {
        let swapped = false;
        for(let i = 0; i < iters; ++i) {
            animations.push(["comparision1", i, i + 1]);
            animations.push(["comparision2", i, i + 1]);
            if(auxillaryArray[i] > auxillaryArray[i + 1]) {
                swapped = true;
                animations.push(["swap", i, auxillaryArray[i + 1]]);
                animations.push(["swap", i + 1, auxillaryArray[i]]);
                swap(auxillaryArray, i, i + 1);
            }
        }
        // after each for-loop, the biggest bubble in the remaining iters will surface
        animations.push(["done", iters, auxillaryArray[iters]]);
        if(swapped === false) break;
        iters--;
    }
}

function swap(auxillaryArray, firstIndex, secondIndex) {
    let temp = auxillaryArray[firstIndex];
    auxillaryArray[firstIndex] = auxillaryArray[secondIndex];
    auxillaryArray[secondIndex] = temp;
}

function arraysAreEqual(firstArray, secondArray) {
    if (firstArray.length !== secondArray.length) {
        return false;
    }
    for (let i = 0; i < firstArray.length; i++) {
      if (firstArray[i] !== secondArray[i]) {
        return false;
      }
    }
    return true;
}



export const BubbleSortDesc = {
    title: 'Bubble Sort',
    description: (
      <p>
        <a
          href="https://en.wikipedia.org/wiki/Bubble_sort"
          target="_blank"
          rel="noopener noreferrer"
        >
          Bubble Sort
        </a>{' '}
        is a simple sorting algorithm that repeatedly steps through the
        list, compares adjacent elements and swaps them if they are in the
        wrong order.The pass through the list is repeated until the list
        is sorted. The algorithm, which is a comparison sort, is named for
        the way smaller or larger elements "bubble" to the top of the
        list. Although the algorithm is simple, it is too slow and
        impractical for most problems
      </p>
    ),
    worstCase: (
      <span>
        O(n<sup>2</sup>)
      </span>
    ),
    avgCase: (
      <span>
        O(n<sup>2</sup>)
      </span>
    ),
    bestCase: <span>O(n)</span>,
    space: <span>O(1)</span>
  };