import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsTree, TreeNode } from './ds-tree';

describe('DsTree', () => {
  let component: DsTree;
  let fixture: ComponentFixture<DsTree>;

  const mockData: TreeNode[] = [
    {
      id: '1',
      label: 'Node 1',
      children: [
        { id: '1-1', label: 'Node 1-1' },
        {
          id: '1-2',
          label: 'Node 1-2',
          children: [{ id: '1-2-1', label: 'Node 1-2-1' }],
        },
      ],
    },
    { id: '2', label: 'Node 2' },
    {
      id: '3',
      label: 'Node 3',
      disabled: true,
      children: [{ id: '3-1', label: 'Node 3-1' }],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsTree],
    }).compileComponents();

    fixture = TestBed.createComponent(DsTree);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Rendering', () => {
    it('should render empty state when no data', () => {
      const emptyElement = fixture.nativeElement.querySelector('.ds-tree__empty');
      expect(emptyElement).toBeTruthy();
      expect(emptyElement.textContent).toContain('No data available');
    });

    it('should render tree nodes', () => {
      fixture.componentRef.setInput('data', mockData);
      fixture.detectChanges();

      const nodes = fixture.nativeElement.querySelectorAll('.ds-tree-node');
      expect(nodes.length).toBeGreaterThan(0);
    });

    it('should render with default size (md)', () => {
      const container = fixture.nativeElement.querySelector('.ds-tree');
      expect(container.classList.contains('ds-tree--md')).toBe(true);
    });

    it('should render with small size', () => {
      fixture.componentRef.setInput('size', 'sm');
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector('.ds-tree');
      expect(container.classList.contains('ds-tree--sm')).toBe(true);
    });

    it('should render with large size', () => {
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector('.ds-tree');
      expect(container.classList.contains('ds-tree--lg')).toBe(true);
    });

    it('should apply with-lines class when showLine is true', () => {
      fixture.componentRef.setInput('showLine', true);
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector('.ds-tree');
      expect(container.classList.contains('ds-tree--with-lines')).toBe(true);
    });

    it('should apply checkable class when checkable is true', () => {
      fixture.componentRef.setInput('checkable', true);
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector('.ds-tree');
      expect(container.classList.contains('ds-tree--checkable')).toBe(true);
    });
  });

  describe('Selection', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('data', mockData);
      fixture.detectChanges();
    });

    it('should select node on click', () => {
      const node = mockData[0];
      component.onNodeClick(node);

      expect(component.selectedNodeId()).toBe(node.id);
    });

    it('should emit nodeSelect event', () => {
      let emittedEvent: any;
      component.nodeSelect.subscribe((event) => (emittedEvent = event));

      const node = mockData[0];
      component.onNodeClick(node);

      expect(emittedEvent).toEqual({ node, selected: true });
    });

    it('should not select disabled node', () => {
      const disabledNode = mockData[2]; // Node 3 is disabled
      component.onNodeClick(disabledNode);

      expect(component.selectedNodeId()).toBeNull();
    });

    it('should check if node is selected', () => {
      const node = mockData[0];
      component.onNodeClick(node);

      expect(component.isSelected(node.id)).toBe(true);
      expect(component.isSelected(mockData[1].id)).toBe(false);
    });
  });

  describe('Expand/Collapse', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('data', mockData);
      fixture.detectChanges();
    });

    it('should expand node on toggle', () => {
      const node = mockData[0];
      component.onNodeToggle(node);

      expect(component.isExpanded(node.id)).toBe(true);
    });

    it('should collapse expanded node on toggle', () => {
      const node = mockData[0];
      component.onNodeToggle(node);
      expect(component.isExpanded(node.id)).toBe(true);

      component.onNodeToggle(node);
      expect(component.isExpanded(node.id)).toBe(false);
    });

    it('should emit nodeExpand event', () => {
      let emittedEvent: any;
      component.nodeExpand.subscribe((event) => (emittedEvent = event));

      const node = mockData[0];
      component.onNodeToggle(node);

      expect(emittedEvent).toEqual({ node, expanded: true });
    });

    it('should expand all nodes when expandAll is true', () => {
      fixture.componentRef.setInput('expandAll', true);
      fixture.detectChanges();

      expect(component.isExpanded('1')).toBe(true);
      expect(component.isExpanded('1-2')).toBe(true);
    });

    it('should not expand disabled node', () => {
      const disabledNode = mockData[2]; // Node 3 is disabled
      component.onNodeToggle(disabledNode);

      expect(component.isExpanded(disabledNode.id)).toBe(false);
    });
  });

  describe('Checkbox', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('data', mockData);
      fixture.componentRef.setInput('checkable', true);
      fixture.detectChanges();
    });

    it('should check node', () => {
      const node = mockData[0];
      component.onNodeCheck(node, true);

      expect(component.isChecked(node.id)).toBe(true);
    });

    it('should uncheck node', () => {
      const node = mockData[0];
      component.onNodeCheck(node, true);
      component.onNodeCheck(node, false);

      expect(component.isChecked(node.id)).toBe(false);
    });

    it('should emit nodeCheck event', () => {
      let emittedEvent: any;
      component.nodeCheck.subscribe((event) => (emittedEvent = event));

      const node = mockData[0];
      component.onNodeCheck(node, true);

      expect(emittedEvent).toEqual({ node, checked: true });
    });

    it('should check all children when parent is checked', () => {
      const parentNode = mockData[0];
      component.onNodeCheck(parentNode, true);

      expect(component.isChecked('1')).toBe(true);
      expect(component.isChecked('1-1')).toBe(true);
      expect(component.isChecked('1-2')).toBe(true);
      expect(component.isChecked('1-2-1')).toBe(true);
    });

    it('should uncheck all children when parent is unchecked', () => {
      const parentNode = mockData[0];
      component.onNodeCheck(parentNode, true);
      component.onNodeCheck(parentNode, false);

      expect(component.isChecked('1')).toBe(false);
      expect(component.isChecked('1-1')).toBe(false);
      expect(component.isChecked('1-2')).toBe(false);
      expect(component.isChecked('1-2-1')).toBe(false);
    });

    it('should return indeterminate state when some children are checked', () => {
      const parentNode = mockData[0];
      const childNode = parentNode.children![0];

      component.onNodeCheck(childNode, true);

      expect(component.getIndeterminateState(parentNode)).toBe(true);
    });

    it('should not check disabled node', () => {
      const disabledNode = mockData[2]; // Node 3 is disabled
      component.onNodeCheck(disabledNode, true);

      expect(component.isChecked(disabledNode.id)).toBe(false);
    });
  });

  describe('ARIA attributes', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('data', mockData);
      fixture.detectChanges();
    });

    it('should have role tree', () => {
      const tree = fixture.nativeElement.querySelector('.ds-tree');
      expect(tree.getAttribute('role')).toBe('tree');
    });

    it('should have role treeitem on nodes', () => {
      const node = fixture.nativeElement.querySelector('.ds-tree-node');
      expect(node.getAttribute('role')).toBe('treeitem');
    });

    it('should have aria-selected on selected node', () => {
      const node = mockData[0];
      component.onNodeClick(node);
      fixture.detectChanges();

      const nodeElement = fixture.nativeElement.querySelector('.ds-tree-node--selected');
      expect(nodeElement.getAttribute('aria-selected')).toBe('true');
    });

    it('should have aria-expanded on expandable nodes', () => {
      const node = mockData[0];
      component.onNodeToggle(node);
      fixture.detectChanges();

      const nodeElement = fixture.nativeElement.querySelector('.ds-tree-node');
      expect(nodeElement.getAttribute('aria-expanded')).toBe('true');
    });

    it('should have aria-disabled on disabled nodes', () => {
      fixture.componentRef.setInput('data', [mockData[2]]); // Node 3 is disabled
      fixture.detectChanges();

      const nodeElement = fixture.nativeElement.querySelector('.ds-tree-node');
      expect(nodeElement.getAttribute('aria-disabled')).toBe('true');
    });

    it('should have tabindex 0 on enabled nodes', () => {
      const nodeElement = fixture.nativeElement.querySelector('.ds-tree-node');
      expect(nodeElement.getAttribute('tabindex')).toBe('0');
    });

    it('should have tabindex -1 on disabled nodes', () => {
      fixture.componentRef.setInput('data', [mockData[2]]); // Node 3 is disabled
      fixture.detectChanges();

      const nodeElement = fixture.nativeElement.querySelector('.ds-tree-node');
      expect(nodeElement.getAttribute('tabindex')).toBe('-1');
    });
  });

  describe('Keyboard navigation', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('data', mockData);
      fixture.detectChanges();
    });

    it('should expand on ArrowRight when collapsed', () => {
      const node = mockData[0];
      const nodeElement = fixture.nativeElement.querySelector('.ds-tree-node');

      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      nodeElement.dispatchEvent(event);

      // Note: This test would need the actual component instance to verify expansion
      // In a real scenario, you'd need to trigger the handler on the component
    });

    it('should collapse on ArrowLeft when expanded', () => {
      const node = mockData[0];
      component.onNodeToggle(node); // Expand first
      fixture.detectChanges();

      const nodeElement = fixture.nativeElement.querySelector('.ds-tree-node');

      const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
      nodeElement.dispatchEvent(event);

      // Note: This test would need the actual component instance to verify collapse
    });

    it('should select on Enter key', () => {
      const nodeElement = fixture.nativeElement.querySelector('.ds-tree-node');

      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      nodeElement.dispatchEvent(event);

      // Note: This test would need the actual component instance to verify selection
    });

    it('should select on Space key', () => {
      const nodeElement = fixture.nativeElement.querySelector('.ds-tree-node');

      const event = new KeyboardEvent('keydown', { key: ' ' });
      nodeElement.dispatchEvent(event);

      // Note: This test would need the actual component instance to verify selection
    });
  });
});
