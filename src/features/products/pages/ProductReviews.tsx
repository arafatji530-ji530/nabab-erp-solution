/**
 * Products - Product Reviews & Ratings
 * EXPERT: UI/UX Designer (Customer Feedback)
 */

import { useState } from 'react';
import {
  makeStyles,
  shorthands,
  tokens,
  Title3,
  Text,
  Card,
  Avatar,
  ProgressBar,
} from '@fluentui/react-components';
import { Star20Filled, Star20Regular } from '@fluentui/react-icons';
import { formatDate } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
});

const REVIEWS = [
  { id: '1', product: 'iPhone 15 Pro', customer: 'John Doe', rating: 5, comment: 'Excellent product, highly recommend!', date: '2026-03-18' },
  { id: '2', product: 'iPhone 15 Pro', customer: 'Jane Smith', rating: 4, comment: 'Great phone, battery life could be better', date: '2026-03-15' },
  { id: '3', product: 'iPhone 15 Pro', customer: 'Mike Johnson', rating: 5, comment: 'Best phone I ever owned', date: '2026-03-12' },
];

export const ProductReviews = () => {
  const classes = useStyles();

  const avgRating = 4.7;

  return (
    <div className={classes.container}>
      <div>
        <Title3>Product Reviews & Ratings</Title3>
        <Text>Customer feedback and product ratings</Text>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: tokens.spacingHorizontalL }}>
        <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
          <Title3 style={{ marginBottom: tokens.spacingVerticalM }}>Overall Rating</Title3>

          <div style={{ textAlign: 'center', marginBottom: tokens.spacingVerticalL }}>
            <Text size={900} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
              {avgRating}
            </Text>
            <div>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star20Filled key={star} style={{ color: tokens.colorPaletteYellowForeground1 }} />
              ))}
            </div>
            <Text size={300}>Based on 3 reviews</Text>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalS }}>
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalS }}>
                <Text>{stars} ⭐</Text>
                <ProgressBar value={stars === 5 ? 66.7 : stars === 4 ? 33.3 : 0} max={100} color="warning" style={{ flex: 1 }} />
                <Text size={200}>{stars === 5 ? 2 : stars === 4 ? 1 : 0}</Text>
              </div>
            ))}
          </div>
        </Card>

        <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
          <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Customer Reviews</Title3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalL }}>
            {REVIEWS.map((review) => (
              <div key={review.id} style={{ ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke2), paddingBottom: tokens.spacingVerticalM } as React.CSSProperties}>
                <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM, marginBottom: tokens.spacingVerticalS }}>
                  <Avatar name={review.customer} size={32} />
                  <div>
                    <Text weight="semibold" block>
                      {review.customer}
                    </Text>
                    <Text size={200}>{formatDate(review.date)}</Text>
                  </div>
                  <div style={{ marginLeft: 'auto' }}>
                    {[1, 2, 3, 4, 5].map((star) =>
                      star <= review.rating ? (
                        <Star20Filled key={star} style={{ color: tokens.colorPaletteYellowForeground1 }} />
                      ) : (
                        <Star20Regular key={star} />
                      )
                    )}
                  </div>
                </div>
                <Text>{review.comment}</Text>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
