import React, { useState, useMemo, useCallback } from 'react';
import { Form, InputGroup, ListGroup, Button } from 'react-bootstrap';

interface Item {
  id: string;
  label: string;
  group?: string;
}

interface Props {
  items: Item[];
  onChange: (selectedIds: string[]) => void;
  height?: number;
  groupName?: string;
  placeholder?: string;
  initialSelected?: string[];
}

export default function MultiSelectList({
  items,
  onChange,
  height = 250,
  groupName = 'Ungrouped',
  placeholder = 'Search…',
  initialSelected = [],
}: Props) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<string>>(
    new Set(initialSelected)
  );

  const filtered = useMemo(
    () =>
      items.filter((i) => i.label.toLowerCase().includes(search.toLowerCase())),
    [items, search]
  );

  const grouped = useMemo(() => {
    const m: Record<string, Item[]> = {};
    filtered.forEach((i) => {
      const g = i.group || groupName;
      if (!m[g]) m[g] = [];
      m[g].push(i);
    });
    return m;
  }, [filtered, groupName]);

  const visible = useMemo(() => filtered.map((i) => i.id), [filtered]);
  const allVisible = visible.every((id) => selected.has(id));

  const toggleSelectAll = useCallback(() => {
    const next = new Set(selected);
    if (allVisible) visible.forEach((id) => next.delete(id));
    else visible.forEach((id) => next.add(id));
    setSelected(next);
    onChange(Array.from(next));
  }, [allVisible, onChange, selected, visible]);

  const toggleOne = useCallback(
    (id: string) => {
      const next = new Set(selected);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      setSelected(next);
      onChange(Array.from(next));
    },
    [onChange, selected]
  );

  return (
    <>
      <InputGroup className="mb-2">
        <Form.Control
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          variant={allVisible ? 'secondary' : 'outline-secondary'}
          onClick={toggleSelectAll}
        >
          {allVisible ? 'Unselect All' : 'Select All'}
        </Button>
      </InputGroup>

      <div style={{ maxHeight: height, overflowY: 'auto' }}>
        <ListGroup variant="flush">
          {Object.entries(grouped).map(([group, items]) => (
            <React.Fragment key={group}>
              <ListGroup.Item
                variant="light"
                className="fw-bold text-uppercase small"
              >
                {group}
              </ListGroup.Item>
              {items.map((it) => (
                <ListGroup.Item
                  action
                  key={it.id}
                  type="button"
                  onClick={() => toggleOne(it.id)}
                  className="d-flex align-items-center"
                >
                  <Form.Check
                    type="checkbox"
                    checked={selected.has(it.id)}
                    onChange={() => toggleOne(it.id)}
                    className="me-2"
                  />
                  {it.label}
                </ListGroup.Item>
              ))}
            </React.Fragment>
          ))}

          {filtered.length === 0 && (
            <ListGroup.Item className="text-center text-muted">
              No items found.
            </ListGroup.Item>
          )}
        </ListGroup>
      </div>
    </>
  );
}
