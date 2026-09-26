import Phrases from '../components/Phrases';
import './FlowBand.css';

const steps = [
  { no: '01', label: 'LINEで予約' },
  { no: '02', label: '予約表で確認' },
  { no: '03', label: 'カルテに記録' },
];

export default function FlowBand() {
  return (
    <section className="flow">
      <div className="container flow__inner">
        <h2 className="flow__title">
          <span>
            <Phrases>お客様には、|いつものLINE。</Phrases>
          </span>
          <span>
            <Phrases>サロンには、|見やすい予約表。</Phrases>
          </span>
        </h2>
        <ol className="flow__steps">
          {steps.map((step) => (
            <li className="flow__step" key={step.no}>
              <span className="flow__num">{step.no}</span>
              <span className="flow__label">{step.label}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
