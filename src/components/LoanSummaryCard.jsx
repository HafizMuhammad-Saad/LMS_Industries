import React from 'react';
import PropTypes from 'prop-types';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  SvgIcon 
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
  },
}));

const IconWrapper = styled(Box)(({ theme, color }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '48px',
  height: '48px',
  borderRadius: '8px',
  backgroundColor: color ? theme.palette[color].light : theme.palette.primary.light,
  color: color ? theme.palette[color].main : theme.palette.primary.main,
  marginBottom: theme.spacing(2),
}));

const LoanSummaryCard = ({ title, value, icon, color, trend, subtitle }) => {
  return (
    <StyledCard>
      <CardContent sx={{ p: 3 }}>
        <IconWrapper color={color}>
          <SvgIcon component={icon} fontSize="medium" />
        </IconWrapper>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ mb: 1 }}
        >
          {title}
        </Typography>
        
        <Typography 
          variant="h4" 
          component="div" 
          sx={{ fontWeight: 600, mb: 1 }}
        >
          {value}
        </Typography>
        
        {subtitle && (
          <Typography 
            variant="caption" 
            color="text.secondary"
            sx={{ display: 'block' }}
          >
            {subtitle}
          </Typography>
        )}
        
        {trend && (
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <Typography 
              variant="caption" 
              color={trend.value > 0 ? 'success.main' : 'error.main'}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              {trend.value > 0 ? '↑' : '↓'} {Math.abs(trend.value)}%
              {trend.text && ` ${trend.text}`}
            </Typography>
          </Box>
        )}
      </CardContent>
    </StyledCard>
  );
};

LoanSummaryCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.elementType.isRequired,
  color: PropTypes.oneOf([
    'primary', 
    'secondary', 
    'error', 
    'warning', 
    'info', 
    'success'
  ]),
  trend: PropTypes.shape({
    value: PropTypes.number,
    text: PropTypes.string,
  }),
  subtitle: PropTypes.string,
};

LoanSummaryCard.defaultProps = {
  color: 'primary',
  trend: null,
  subtitle: '',
};

export default LoanSummaryCard;