import { useState } from 'react';
import { LabelInputPair } from '../LabelInputPair';
import { Select } from '../Select';

const ProjectDetails = () => {
  const [transmission, setTransmission] = useState('');
  const [territory, setTerritory] = useState('');
  const [platform, setPlatform] = useState('');

  return (
    <>
      <LabelInputPair
        label="Transmission"
        value={transmission}
        setValue={setTransmission}
        placeholder="Enter Transmission details"
      />
      <Select
        label="Territory"
        value={territory}
        onChange={setTerritory}
        placeholder="Enter Territory"
        options={[
          'North America',
          'Europe',
          'Asia',
          'South America',
          'Africa',
          'Australia',
          'Antarctica',
        ]}
      />
      <Select
        label="Platform"
        value={platform}
        onChange={setPlatform}
        placeholder="Enter Platform"
        options={['Android', 'iOS', 'Windows', 'macOS', 'Linux', 'Chrome OS']}
      />
    </>
  );
};

export default ProjectDetails;
