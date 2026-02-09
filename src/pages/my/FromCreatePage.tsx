import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputField } from '@/components/common/InputField';
import FromCreator from '@/components/common/FromCreator';
import type { CreateFrom } from '@/types/from';
import erasebtn from '@/assets/create/erasebtn.svg';
import { createFrom } from '@/api/from';
import useToast from '@/hooks/useToast';

export default function FromCreatePage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateImmediate = async (draft: CreateFrom) => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await createFrom(draft);
      if (!res.success) {
        toast.show(res.message || '프롬 생성에 실패했어요.');
        return;
      }
      navigate('/my/from', {
        replace: true,
        state: {
          createdFrom: { ...draft, fromId: res.data.fromId },
        },
      });
    } catch {
      toast.show('프롬 생성 중 오류가 발생했어요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="p-0 mt-3 px-0">
        <InputField
          value={input}
          onChange={setInput}
          placeholder="이름을 입력하세요"
          useGrayWhenBlurred
          maxLength={7}
          inputClassName="h-[50px] rounded-xl px-4 text-base font-medium outline-none cursor-text focus:bg-white focus:ring-1 focus:ring-primary"
          rightElement={
            input ? (
              <button
                onClick={() => setInput('')}
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
          name={input}
          onNameChange={setInput}
          disabled={loading}
        />
      </div>
    </div>
  );
}

