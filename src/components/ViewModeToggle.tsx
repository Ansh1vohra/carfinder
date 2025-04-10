
import React from 'react';
import { Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ViewModeToggleProps {
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

const ViewModeToggle = ({ viewMode, onViewModeChange }: ViewModeToggleProps) => {
  return (
    <div className="flex gap-2">
      <Button
        variant={viewMode === 'grid' ? 'default' : 'outline'}
        size="icon"
        onClick={() => onViewModeChange('grid')}
        aria-label="Grid view"
      >
        <Grid size={18} />
      </Button>
      <Button
        variant={viewMode === 'list' ? 'default' : 'outline'}
        size="icon"
        onClick={() => onViewModeChange('list')}
        aria-label="List view"
      >
        <List size={18} />
      </Button>
    </div>
  );
};

export default ViewModeToggle;
