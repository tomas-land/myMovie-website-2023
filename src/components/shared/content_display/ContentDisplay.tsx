import s from './content_display.module.scss';


interface iProps {
  headerTitle: string;
  children: React.ReactNode;
}

const ContentDisplay = ({ headerTitle, children }: iProps) => {
  return (
    <div className={s.content_display}>
      <div className={s.header}>
        <h1 className={s.title}>{headerTitle}</h1>
      </div>
      <div className={s.content}>
        {children}
      </div>
    </div>
  );
};

export default ContentDisplay;
