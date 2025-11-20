"use client";
import Link from "next/link";
import styles from "./style.module.css";
import { useState } from "react";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className={`font-inter ${styles.header}`}>
      <div className={styles.container}>
        <h1 className={styles.logo}>
          <Link href="/">NexPress</Link>
        </h1>
        <nav aria-label="Main Navigation" className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/blogs">Blogs</Link>
            </li>
            <li>
              <Link href="/categories">Categories</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
        </nav>
        <div className={styles.action}>
          <Link href="/login" className={styles.loginBtn}>
            Login
          </Link>
        </div>
        <button
          className={styles.humburger}
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
          type="button"
        >
          <span className={open ? styles.barToOpen : styles.barTop}></span>
          <span className={open ? styles.barMidOpen : styles.barMid}></span>
          <span className={open ? styles.barBotOpen : styles.barBot}></span>
        </button>
      </div>
      <div className={`${styles.mobileMenu} ${open ? styles.mobileOpen : ""}`}>
        <Link href="/" onClick={() => setOpen(false)}>
          Home
        </Link>
        <Link href="/blogs" onClick={() => setOpen(false)}>
          Blogs
        </Link>
        <Link href="/categories" onClick={() => setOpen(false)}>
          Categories
        </Link>
        <Link href="/about" onClick={() => setOpen(false)}>
          About
        </Link>
        <Link href="/login" onClick={() => setOpen(false)}>
          Login
        </Link>
      </div>
    </header>
  );
}
