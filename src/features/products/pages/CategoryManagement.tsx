/**
 * Products - Category Management (Tree View)
 * EXPERT: UI/UX Designer (Azure Portal Pattern)
 */

import { useState } from 'react';
import {
  makeStyles,
  shorthands,
  tokens,
  Button,
  Input,
  Title3,
  Text,
  Card,
  Tree,
  TreeItem,
  TreeItemLayout,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Label,
  Textarea,
} from '@fluentui/react-components';
import {
  Add20Regular,
  Edit20Regular,
  Delete20Regular,
  FolderOpen20Regular,
  ChevronRight20Regular,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    ...shorthands.gap(tokens.spacingHorizontalL),
    height: 'calc(100vh - 200px)',
  },
  treePanel: {
    flex: '0 0 400px',
    ...shorthands.overflow('auto'),
    ...shorthands.padding(tokens.spacingVerticalL),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  detailPanel: {
    flex: 1,
    ...shorthands.padding(tokens.spacingVerticalL),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  categoryHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: tokens.spacingVerticalL,
  },
  treeActions: {
    display: 'flex',
    ...shorthands.gap(tokens.spacingHorizontalS),
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    ...shorthands.gap(tokens.spacingHorizontalM),
    marginTop: tokens.spacingVerticalL,
  },
  statCard: {
    ...shorthands.padding(tokens.spacingVerticalM),
    textAlign: 'center',
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalS),
    marginBottom: tokens.spacingVerticalM,
  },
});

const MOCK_CATEGORIES = [
  {
    id: '1',
    name: 'Power Tools',
    productCount: 245,
    children: [
      { id: '1-1', name: 'Drills', productCount: 89 },
      { id: '1-2', name: 'Saws', productCount: 67 },
      { id: '1-3', name: 'Grinders', productCount: 89 },
    ],
  },
  {
    id: '2',
    name: 'Electrical',
    productCount: 567,
    children: [
      { id: '2-1', name: 'Cables & Wires', productCount: 234 },
      { id: '2-2', name: 'Circuit Breakers', productCount: 178 },
      { id: '2-3', name: 'Switches & Sockets', productCount: 155 },
    ],
  },
  {
    id: '3',
    name: 'Safety Equipment',
    productCount: 189,
    children: [
      { id: '3-1', name: 'Helmets', productCount: 45 },
      { id: '3-2', name: 'Gloves', productCount: 89 },
      { id: '3-3', name: 'Safety Glasses', productCount: 55 },
    ],
  },
];

export const CategoryManagement = () => {
  const classes = useStyles();
  const [selectedCategory, setSelectedCategory] = useState(MOCK_CATEGORIES[0]);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div>
      <div style={{ marginBottom: tokens.spacingVerticalL }}>
        <Title3>Category Management</Title3>
        <Text>Organize products in hierarchical categories with drag-and-drop</Text>
      </div>

      <div className={classes.container}>
        <Card className={classes.treePanel}>
          <div className={classes.categoryHeader}>
            <Title3>Category Tree</Title3>
            <Dialog open={dialogOpen} onOpenChange={(_, data) => setDialogOpen(data.open)}>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="primary" icon={<Add20Regular />} size="small">
                  Add
                </Button>
              </DialogTrigger>
              <DialogSurface>
                <DialogBody>
                  <DialogTitle>New Category</DialogTitle>
                  <DialogContent>
                    <div className={classes.formGroup}>
                      <Label required>Category Name</Label>
                      <Input placeholder="Enter category name" />
                    </div>
                    <div className={classes.formGroup}>
                      <Label>Parent Category</Label>
                      <Input placeholder="Leave empty for root category" />
                    </div>
                    <div className={classes.formGroup}>
                      <Label>Description</Label>
                      <Textarea rows={3} placeholder="Category description..." />
                    </div>
                  </DialogContent>
                  <DialogActions>
                    <DialogTrigger disableButtonEnhancement>
                      <Button appearance="secondary">Cancel</Button>
                    </DialogTrigger>
                    <Button appearance="primary">Create Category</Button>
                  </DialogActions>
                </DialogBody>
              </DialogSurface>
            </Dialog>
          </div>

          <Tree aria-label="Category tree">
            {MOCK_CATEGORIES.map((category) => (
              <TreeItem
                key={category.id}
                itemType="branch"
                value={category.id}
                onClick={() => setSelectedCategory(category)}
              >
                <TreeItemLayout
                  iconBefore={<FolderOpen20Regular />}
                  expandIcon={<ChevronRight20Regular />}
                >
                  {category.name} ({category.productCount})
                </TreeItemLayout>
                <Tree>
                  {category.children?.map((child) => (
                    <TreeItem key={child.id} itemType="leaf" value={child.id}>
                      <TreeItemLayout>
                        {child.name} ({child.productCount})
                      </TreeItemLayout>
                    </TreeItem>
                  ))}
                </Tree>
              </TreeItem>
            ))}
          </Tree>
        </Card>

        <Card className={classes.detailPanel}>
          <div className={classes.categoryHeader}>
            <div>
              <Title3>{selectedCategory.name}</Title3>
              <Text size={300}>{selectedCategory.productCount} products in this category</Text>
            </div>
            <div className={classes.treeActions}>
              <Button appearance="subtle" icon={<Edit20Regular />}>
                Edit
              </Button>
              <Button appearance="subtle" icon={<Delete20Regular />}>
                Delete
              </Button>
            </div>
          </div>

          <div className={classes.statsGrid}>
            <div className={classes.statCard}>
              <Text size={600} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
                {selectedCategory.productCount}
              </Text>
              <Text size={200}>Total Products</Text>
            </div>
            <div className={classes.statCard}>
              <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
                {selectedCategory.children?.length || 0}
              </Text>
              <Text size={200}>Subcategories</Text>
            </div>
            <div className={classes.statCard}>
              <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteBlueForeground2 }}>
                3
              </Text>
              <Text size={200}>Active Filters</Text>
            </div>
          </div>

          <div style={{ marginTop: tokens.spacingVerticalXL }}>
            <Text size={400} weight="semibold" block style={{ marginBottom: tokens.spacingVerticalM }}>
              Category Properties
            </Text>
            <div className={classes.formGroup}>
              <Label>Display Order</Label>
              <Input type="number" defaultValue="1" />
            </div>
            <div className={classes.formGroup}>
              <Label>SEO Description</Label>
              <Textarea rows={2} placeholder="SEO-friendly description" />
            </div>
            <div className={classes.formGroup}>
              <Label>Commission Rate (%)</Label>
              <Input type="number" defaultValue="5" />
            </div>
            <Button appearance="primary" style={{ marginTop: tokens.spacingVerticalM }}>
              Save Changes
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
