'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import classes from './Navbar.module.scss';

export default function AppNavbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const isAdmin = session?.isSystemAdmin;

  return (
    <Navbar bg="white" expand="lg" className={classes.navbar} sticky="top">
      <Container>
        <Link href="/" className="navbar-brand">
          <span className={classes.brand}>Novelus Review App</span>
        </Link>

        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link active={pathname === '/'} as={Link} href="/">
              Dashboard
            </Nav.Link>
            {isAdmin && (
              <Nav.Link
                active={pathname.startsWith('/admin/cycles')}
                as={Link}
                href="/admin/cycles"
              >
                Review Cycles
              </Nav.Link>
            )}
          </Nav>

          <Nav>
            {status === 'authenticated' && session.user?.name ? (
              <NavDropdown
                title={session.user.name}
                id="user-dropdown"
                align="end"
              >
                <NavDropdown.Item onClick={() => signOut()}>
                  Sign out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Link href="/api/auth/signin" passHref>
                <Nav.Link>Sign in</Nav.Link>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
