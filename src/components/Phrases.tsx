import { Fragment } from 'react';
import './Phrases.css';

/**
 * `|` で区切った文節の境目にだけ改行を許す。
 * word-break: auto-phrase は iOS Safari が未対応のため、区切りは手で入れる。
 */
export default function Phrases({ children }: { children: string }) {
  const parts = children.split('|');
  return (
    <span className="phrases">
      {parts.map((part, i) => (
        <Fragment key={i}>
          {i > 0 ? <wbr /> : null}
          {part}
        </Fragment>
      ))}
    </span>
  );
}
