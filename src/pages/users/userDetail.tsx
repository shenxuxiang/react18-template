import React from 'react';
import CommonLayout from '@/common/CommonLayout';

export default function UserDetail(props: any) {
  return (
    <CommonLayout>
      <div onClick={() => props.navigate('/list')}>to list</div>
    </CommonLayout>
  );
}
