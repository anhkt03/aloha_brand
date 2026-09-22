export interface NavItem {
  /** Key used to look up the label in translation JSON */
  key: string;
  /** Route path appended after the locale segment. `""` = home. */
  href: string;
}
