import React from 'react';
export function getQuickSortAnimations(array) {
    let animations  = [];
    let auxillaryArray = array.slice();
    quickSort(auxillaryArray, 0, auxillaryArray.length - 1, animations);
    const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
    console.log("sort works correctly? ",arraysAreEqual(javaScriptSortedArray, auxillaryArray));
    array = auxillaryArray;
    return [animations, array];
}

function quickSort(auxillaryArray, startIndex, endIndex, animations) {
    let pivotIndex;
    if (startIndex < endIndex) {
        pivotIndex = partitionArray(auxillaryArray, startIndex, endIndex, animations);
        quickSort(auxillaryArray, startIndex, pivotIndex - 1, animations);
        quickSort(auxillaryArray, pivotIndex + 1, endIndex, animations);
    }
    // when pivot finally came to the end, among -2, -1, or = auxillaryArray.length, coloring all bars
    if (pivotIndex >= auxillaryArray.length - 2)
        for (let i = 0; i < auxillaryArray.length; i++)
            animations.push(["done", i, auxillaryArray[i]]);
}

function partitionArray(auxillaryArray, startIndex, endIndex, animations) {
    // Pick a random element as pivot.
    let pivotIndex = randomIntFromInterval(startIndex, endIndex);
    // Swap the pivot to the end, for the convenience of moving start pointer
    animations.push(["comparision1", pivotIndex, endIndex]);
    animations.push(["swap", pivotIndex, auxillaryArray[endIndex]]);
    animations.push(["swap", endIndex, auxillaryArray[pivotIndex]]);
    animations.push(["comparision2", pivotIndex, endIndex]);
    swap(auxillaryArray, pivotIndex, endIndex);

    // Index of smaller element and indicates the right position of pivot found so far
    let lessTailIndex = startIndex;

    for(let i = startIndex; i < endIndex; ++i) {
        animations.push(["comparision1", i, endIndex]);
        animations.push(["comparision2", i, endIndex]);
        if(auxillaryArray[i] <= auxillaryArray[endIndex]) {
            animations.push(["comparision1", i, lessTailIndex]);
            animations.push(["swap", i, auxillaryArray[lessTailIndex]]);
            animations.push(["swap", lessTailIndex, auxillaryArray[i]]);
            animations.push(["comparision2", i, lessTailIndex]);
            swap(auxillaryArray, i, lessTailIndex);
            lessTailIndex++;
        }
    }
    animations.push(["comparision1", lessTailIndex, endIndex]);
    animations.push(["swap", endIndex, auxillaryArray[lessTailIndex]]);
    animations.push(["swap", lessTailIndex, auxillaryArray[endIndex]]);
    animations.push(["comparision2", lessTailIndex, endIndex]);
    swap(auxillaryArray, lessTailIndex, endIndex);
    for (let j = startIndex; j < lessTailIndex; j++) animations.push(["done", j, auxillaryArray[j]]);
    for (let k = lessTailIndex+1; k <= endIndex; k++) animations.push(["done", k, auxillaryArray[k]]);
    return lessTailIndex;
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

function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}



export const QuickSortDesc = {
    title: 'Quick Sort',
    description: (
      <div>
        <p>
          <a
            href="https://en.wikipedia.org/wiki/Quicksort"
            target="_blank"
            rel="noopener noreferrer"
          >
            Quick Sort
          </a>{' '}
          is an efficient, in-place sorting algorith that in practice is
          faster than MergeSort and HeapSort. However, it is not a stable
          sorting algorithm, meaning that the relative positioning of
          equal sort items is not preserved.Quicksort is a divide and
          conquer algorithm. Quicksort first divides a large array into
          two smaller sub-arrays: the low elements and the high elements.
          Quicksort can then recursively sort the sub-arrays. The steps
          are:
        </p>
        <ol>
          <li>
            Pick an element, called a pivot, from the array. This is
            usually done at random.
          </li>
          <li>Move pivot element to the start of the array.</li>
          <li>
            <em>Partitioning:</em> reorder the array so that all elements
            with values less than the pivot come before the pivot, while
            all elements with values greater than the pivot come after it
            (equal values can go either way). After this partitioning, the
            pivot is in its final position. This is called the{' '}
            <em>partition</em> operation.
          </li>
          <li>
            Recursively apply the above steps to the sub-array of elements
            with smaller values and separately to the sub-array of
            elements with greater values.
          </li>
        </ol>
        <p>
          The base case of the recursion is an array of size zero or one,
          which are sorted by definition.
        </p>
      </div>
    ),
    worstCase: (
      <span>
        O(<em>n</em>
        <sup>2</sup>)
      </span>
    ),
    avgCase: (
      <span>
        O(<em>n</em>log<em>n</em>)
      </span>
    ),
    bestCase: (
      <span>
        O(<em>n</em>log<em>n</em>)
      </span>
    ),
    space: (
      <span>
        O(log<em>n</em>)
      </span>
    )
  };