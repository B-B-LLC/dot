import { ImageResponse } from 'next/og';

import { AMBLEM_ACIK, AMBLEM_KOYU, Dis } from './_ortak/amblem';

/* iOS ana ekran ikonu. Köşeleri iOS kendisi yuvarlar ve maskeler; bu yüzden
   burada köşe yuvarlaması yoktur (yuvarlarsak köşelerde saydam üçgenler kalır)
   ve diş, maskenin kırptığı payı hesaba katarak biraz daha küçük durur. */

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIkonu() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: AMBLEM_KOYU
        }}
      >
        <Dis olcu={104} dolgu={AMBLEM_ACIK} />
      </div>
    ),
    size
  );
}
