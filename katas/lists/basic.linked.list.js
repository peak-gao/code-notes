/*

A Linked List is a simple data structure.  It's a sequence of elements where each element links to the next element.
It can contain any type of data (strings, chars, whatever)

- Elements in the list can be unsorted or sorted
- The list can contain duplicate elements or all unique elements

A linked list shares many of the same properties as an array but what makes it different is that in an array elements
are indexed which means if you want to get to a specific element, you can instantly just to right to it via its index.

However in a linked list, as opposed to an array you have to start at the head and work your way through until you get
to the element you're looking for.  This takes linear time so it's quite a bit slower than grabbing items from an array.

Advantages:
 - the advantage of using one is that insertions and deletions are very quick.  If you want to just insert or
delete an element at the beginning of the list that can be done in constant time

Disadvantages:
  - it's slow if you want to add or delete an element at the end of the list because you have to walk through every
    element to get to the end before you can add / delete which does take linear time.  So using a linked list depends
    on what the use case is you have whether you'd use one or not

Doubly Linked List: in addition to having an element link to the next element, each element also links to the previous
element

Methods to Implement:

append(data)
  - you pass in some data to be added to the linked list
  - need to start off with a pointer to point to the head of the linked list
    - if the head of the linked list is null, we create a new node and set the head to the new node that contains
      the data sent in
    - if we had no head and then had to add a new node to start, we return out of the append operation
  - you then walk through the linked list until we get to the end of it
    - the way you know that you're not at the end of the list yet is that there won't be next node, it'll be null
    - so..knowing that you can loop through and walk the list until the next node is null, then you know you're at the
      end
  - once you know you're at the end of the linked list, create / add a new node and set that node to the current node's
    next node value

prepend(data)
- you create a new head value
- link new head's next value to the old head
- then change the head pointer to point to this new head node

delete(data)
- if head is null, just return because we can't do anything in that situation
- now walk through the linked list.  Stop one before the element we want to delete
  - if current.next.data equals the data we want to delete (meaning if the next node in the linked list is the one you
  want to delete, you want to cut out that value
    - the way you do that is to set current.next - current.next.next
      - so that sets your current node's next to the be the node after the node you want to delete which essentially
        deletes it
  - otherwise keep moving to the next element till you find the element you're trying to delete




 */