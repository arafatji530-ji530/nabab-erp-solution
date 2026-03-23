/**
 * Inventory - Stock Adjustment Page
 * Handle stock additions, deductions, and corrections
 */

import { useState } from 'react';
import {
  makeStyles,
  shorthands,
  tokens,
  Button,
  Input,
  Label,
  Dropdown,
  Option,
  Textarea,
  Card,
  Title3,
  MessageBar,
  MessageBarBody,
  Radio,
  RadioGroup,
} from '@fluentui/react-components';
import { Save20Regular, Dismiss20Regular } from '@fluentui/react-icons';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { stockAdjustmentSchema } from '@/shared/utils/validators';
import { apiService } from '@/services/api';

const useStyles = makeStyles({
  container: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
    ...shorthands.padding(tokens.spacingVerticalXL, tokens.spacingHorizontalXL),
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalS),
  },
  actions: {
    display: 'flex',
    ...shorthands.gap(tokens.spacingHorizontalM),
    justifyContent: 'flex-end',
    ...shorthands.padding(tokens.spacingVerticalL, '0'),
    ...shorthands.borderTop('1px', 'solid', tokens.colorNeutralStroke2),
    marginTop: tokens.spacingVerticalL,
  },
  errorText: {
    color: tokens.colorPaletteRedForeground1,
    fontSize: tokens.fontSizeBase200,
  },
});

type AdjustmentFormData = {
  warehouseId: string;
  productId: string;
  quantity: number;
  type: 'Add' | 'Remove';
  reason: string;
};

export const StockAdjustment = () => {
  const classes = useStyles();
  const [success, setSuccess] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AdjustmentFormData>({
    resolver: zodResolver(stockAdjustmentSchema),
    defaultValues: {
      type: 'Add',
      quantity: 0,
    },
  });

  const onSubmit = async (data: AdjustmentFormData) => {
    try {
      await apiService.inventory.adjustStock(data);
      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error('Adjustment failed:', error);
    }
  };

  return (
    <div className={classes.container}>
      <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Stock Adjustment</Title3>

      {success && (
        <MessageBar intent="success" style={{ marginBottom: tokens.spacingVerticalL }}>
          <MessageBarBody>Stock adjustment completed successfully!</MessageBarBody>
        </MessageBar>
      )}

      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <div className={classes.formGroup}>
            <Label required>Adjustment Type</Label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field}>
                  <Radio value="Add" label="Add Stock" />
                  <Radio value="Remove" label="Remove Stock" />
                </RadioGroup>
              )}
            />
            {errors.type && <span className={classes.errorText}>{errors.type.message}</span>}
          </div>

          <div className={classes.formGroup}>
            <Label required>Warehouse</Label>
            <Controller
              name="warehouseId"
              control={control}
              render={({ field }) => (
                <Dropdown placeholder="Select warehouse" {...field}>
                  <Option value="wh-1">Dhaka Warehouse</Option>
                  <Option value="wh-2">Chittagong Warehouse</Option>
                  <Option value="wh-3">Sylhet Warehouse</Option>
                </Dropdown>
              )}
            />
            {errors.warehouseId && (
              <span className={classes.errorText}>{errors.warehouseId.message}</span>
            )}
          </div>

          <div className={classes.formGroup}>
            <Label required>Product</Label>
            <Controller
              name="productId"
              control={control}
              render={({ field }) => (
                <Dropdown placeholder="Select product" {...field}>
                  <Option value="prod-1">Industrial Drill Machine</Option>
                  <Option value="prod-2">Circuit Breaker 220V</Option>
                  <Option value="prod-3">Safety Helmet</Option>
                </Dropdown>
              )}
            />
            {errors.productId && (
              <span className={classes.errorText}>{errors.productId.message}</span>
            )}
          </div>

          <div className={classes.formGroup}>
            <Label required>Quantity</Label>
            <Controller
              name="quantity"
              control={control}
              render={({ field }) => (
                <Input
                  type="number"
                  {...field}
                  value={field.value?.toString() || ''}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              )}
            />
            {errors.quantity && (
              <span className={classes.errorText}>{errors.quantity.message}</span>
            )}
          </div>

          <div className={classes.formGroup}>
            <Label required>Reason</Label>
            <Controller
              name="reason"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  rows={4}
                  placeholder="Enter reason for adjustment..."
                />
              )}
            />
            {errors.reason && <span className={classes.errorText}>{errors.reason.message}</span>}
          </div>

          <div className={classes.actions}>
            <Button appearance="secondary" icon={<Dismiss20Regular />} onClick={() => reset()}>
              Reset
            </Button>
            <Button
              appearance="primary"
              icon={<Save20Regular />}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Submit Adjustment'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
