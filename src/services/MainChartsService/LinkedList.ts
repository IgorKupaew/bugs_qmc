class ListNode<T> {
  data: T;
  next: ListNode<T> | null = null;

  constructor(data: T) {
    this.data = data;
  }
}

export class CircularLinkedList<T> {
  head: ListNode<T> | null = null;
  tail: ListNode<T> | null = null;
  length: number = 0;

  push(data: T): void {
    const newNode = new ListNode(data);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
    }

    this.length++;
  }

  shift() {
    if (this.head) {
      this.head = this.head.next;
      this.length--;
    }
  }
  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;

    while (current) {
      result.push(current.data);
      current = current.next;
      if (current === this.head) break;
    }

    return result;
  }

  slice(start: number, end: number): CircularLinkedList<T> {
    const newList = new CircularLinkedList<T>();
    let current = this.head;
    let i = 0;

    while (current && i < end) {
      if (i >= start) {
        newList.push(current.data);
      }
      current = current.next;
      i++;

      if (current === this.head) break;
    }

    return newList;
  }
}
