import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputField } from '@/components/common/InputField';
import FromCreator from '@/components/common/FromCreator';
import type { CreateFrom } from '@/types/from';
import erasebtn from '@/assets/create/erasebtn.svg';

async function createFromApi(draft: CreateFrom) {
  return new Promise((res) => {
    setTimeout(() => {
      res({ fromId: Math.floor(Math.random() * 100000), ...draft });
    }, 400);
  });
}

export default function FromCreatePage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleCreateImmediate = async (draft: CreateFrom) => {
    const created = await createFromApi(draft);

    navigate('/my/from', {
      replace: true,
      state: {
        createdFrom: created,
      },
    });
  };

  return (
    <div>
      <div className="p-0 mt-3 px-0">
        <InputField
          value={query}
          onChange={setQuery}
          placeholder="이름을 입력하세요"
          useGrayWhenBlurred
          maxLength={7}
          inputClassName="h-[50px] rounded-xl px-4 text-base font-medium outline-none cursor-text focus:bg-white focus:ring-1 focus:ring-primary"
          rightElement={
            query ? (
              <button
                onClick={() => setQuery('')}
                className="flex items-center justify-center w-6 h-6"
              >
                <img src={erasebtn} alt="clear" />
              </button>
            ) : undefined
          }
        />
      </div>

      <div className="mt-2">
        <FromCreator
          onCreateImmediate={handleCreateImmediate}
          name={query}
          onNameChange={setQuery}
        />
      </div>
    </div>
  );
}

