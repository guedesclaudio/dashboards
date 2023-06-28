import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { styled } from 'styled-components';

export default function DesktopMenu({value}: {value: string}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Title>{value}</Title>
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Link href='/'>
          <MenuItem onClick={handleClose}>Home</MenuItem>
        </Link>
        <Link href='/reports-general'>
          <MenuItem onClick={handleClose}>Relatório Geral</MenuItem>
        </Link>
        <Link href='/reports-mdo'>
          <MenuItem onClick={handleClose}>Relatório de Mão de Obra</MenuItem>
        </Link>
      </Menu>
    </div>
  );
}

const Title = styled.h1`
  font-size: 30px;
  color: white;
  font-family: 'Arial';
  text-align: center;
`
const Link = styled.a`
  text-decoration: none;
  color: grey;
`;