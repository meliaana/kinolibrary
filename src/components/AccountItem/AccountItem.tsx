import { useState } from 'react';
import { ButtonWithIcon } from '../ButtonWithIcon';
import { EditIcon } from '../EditIcon';
import styles from './AccountItem.module.css';

interface FormField {
  key: string;
  value: string;
}

interface AccountItemProps {
  title: string;
  formFields: FormField[];
}

const AccountItem = ({ title, formFields }: AccountItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [values, setValues] = useState(() =>
    Object.fromEntries(formFields.map((f) => [f.key, f.value])),
  );

  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <section className={styles.accountItem}>
      <header className={styles.accountItemHeader}>
        <h4 className={styles.accountItemTitle}>{title}</h4>
        <div className={styles.editButton}>
          <ButtonWithIcon text="edit" onClick={() => setIsEditing(!isEditing)}>
            <EditIcon />
          </ButtonWithIcon>
        </div>
      </header>

      <form className={styles.form}>
        {formFields.map(({ key }) => (
          <div key={key} className={styles.field}>
            <label htmlFor={key} className={styles.label}>
              {key[0].toUpperCase() + key.slice(1)}
            </label>

            {isEditing ? (
              <input
                id={key}
                name={key}
                type="text"
                value={values[key]}
                onChange={(e) => handleChange(key, e.target.value)}
                className={styles.input}
              />
            ) : (
              <p className={styles.text}>{values[key]}</p>
            )}
          </div>
        ))}
      </form>
    </section>
  );
};

export default AccountItem;
