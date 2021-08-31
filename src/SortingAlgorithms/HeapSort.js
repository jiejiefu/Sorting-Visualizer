import React from 'react';
export function getHeapSortAnimations(array) {
    let animations  = [];
    let auxillaryArray = array.slice();
    heapSort(auxillaryArray, animations);
    const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
    console.log("sort works correctly? ",arraysAreEqual(javaScriptSortedArray, auxillaryArray));
    array = auxillaryArray;
    return [animations, array];
}

function heapSort(auxillaryArray, animations) {
    // Build max heap
    buildMaxHeap(auxillaryArray, animations);
    const N = auxillaryArray.length;
    // Get the index of the last element
    let lastElement = N - 1;

    // Continue heap sorting until we have One element left
    while (lastElement >= 0) { // add equal sign for the purpose to color the very last Element "zero" index. 
        animations.push(["swap", 0, auxillaryArray[lastElement]]);
        animations.push(["swap", lastElement, auxillaryArray[0]]);
        animations.push(["done", lastElement, auxillaryArray[0]]);
        swap(auxillaryArray, 0, lastElement);
        heapify(auxillaryArray, 0, lastElement, animations);
        lastElement--;
    }
}

function buildMaxHeap(array, animations) {
    let currentIndex = Math.floor(array.length / 2);
    while (currentIndex >= 0) {
        heapify(array, currentIndex, array.length, animations);
        currentIndex--;
    }
  }

function heapify(array, start, end, animations) {
    if (start >= Math.floor(end / 2)) {
        return;
    }
    let left = start * 2 + 1,
        right = start * 2 + 2 < end ? start * 2 + 2 : null,swapIndex;
    if (right) {
        swapIndex = array[left] > array[right] ? left : right;
    } else {
        swapIndex = left;
    }
    animations.push(["comparision1", start, swapIndex]);
    animations.push(["comparision2", start, swapIndex]);
    if (array[start] < array[swapIndex]) {
        animations.push(["swap", start, array[swapIndex]]);
        animations.push(["swap", swapIndex, array[start]]);
        swap(array, start, swapIndex);
        heapify(array, swapIndex, end, animations);
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



export const HeapSortDesc = {
    title: 'Heap Sort',
    description: (
      <div>
        <p>
          <a
            href="https://en.wikipedia.org/wiki/Heapsort"
            target="_blank"
            rel="noopener noreferrer"
          >
            Heap Sort
          </a>{' '}
          can be thought of as an improved selection sort that uses the
          heap data structure rather than a linear-time search to find the
          maximum or minimum element. It is an in-place sorting algorithm
          that is not stable and has a somewhat slower running time than
          Quicksort in practice.
        </p>
        <p>
          The heapsort algorithm can be divided into two parts. In the
          first step, a heap is built out of the data. The heap is often
          placed in an array with the layout of a complete binary tree. In
          the second step, a sorted array is created by repeatedly
          removing the largest element from the heap (the root of the
          heap), and inserting it into the array. The heap is updated
          after each removal to maintain the heap property. Once all
          objects have been removed from the heap, the result is a sorted
          array.
        </p>
        <ol>
          <li>
            Call the buildMaxHeap() function on the list. Also referred to
            as heapify(), this builds a heap from a list in O(n)
            operations.
          </li>
          <li>
            Swap the first element of the list with the final element.
            Decrease the considered range of the list by one.
          </li>
          <li>
            Call the <em>siftDown()</em>, also called{' '}
            <em>maxHeapify()</em> function on the list to sift the new
            first element to its appropriate index in the heap.
          </li>
          <li>
            Go to step (2) unless the considered range of the list is one
            element.
          </li>
        </ol>
      </div>
    ),
    worstCase: (
      <span>
        O(<em>n</em> log <em>n</em>)
      </span>
    ),
    avgCase: (
      <span>
        O(<em>n</em> log <em>n</em>)
      </span>
    ),
    bestCase: (
      <span>
        O(<em>n</em> log <em>n</em>)
      </span>
    ),
    space: <span>O(1)</span>
  };