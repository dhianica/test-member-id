import { formattingNumber } from 'utils/helper.util';
import '../styles/globals.scss'
import Image from 'next/image'

import Voucher from '../public/voucher.png';
import Voucher1 from '../public/voucher1.webp';
import Voucher2 from '../public/voucher2.webp';
import Voucher3 from '../public/voucher3.webp';
import Voucher4 from '../public/voucher4.webp';
import Voucher5 from '../public/voucher5.webp';
import Voucher6 from '../public/voucher6.webp';
import Voucher7 from '../public/voucher7.webp';
import Voucher8 from '../public/voucher8.webp';

type TAwardProps = {
    award_price: number;
    AwardType: {
        award_type_name: string
    };
    award_description: string;
};

type TAwardType = {
    AwardTypeName: string;
    AwardTypeColor: string;
    AwardTypeImage: any;
}

const listColor = ['bg-primary', 'bg-secondary', 'bg-success', 'bg-warning']
const listImage = [Voucher1, Voucher2, Voucher3, Voucher4, Voucher5, Voucher6, Voucher7, Voucher8]

const AwardType: TAwardType[] = []

export default function Award({items} : {items: TAwardProps}) {
    let checkAwardType = AwardType.find((x) => x.AwardTypeName === items.AwardType.award_type_name)
    if(!checkAwardType) {
        AwardType.push({
            AwardTypeName: items.AwardType.award_type_name,
            AwardTypeColor: listColor[Math.floor(Math.random() * listColor.length)],
            AwardTypeImage: listImage[Math.floor(Math.random() * listImage.length)]
        })
    }
    checkAwardType = AwardType.find((x) => x.AwardTypeName === items.AwardType.award_type_name)

    return (
        <>
            <div className="card w-50 shadow align-self-center border-0">
                <Image src={checkAwardType?.AwardTypeImage || Voucher} alt="" className="card-img img-responsive" width={500} height={140}></Image>
                <div className="card-img-overlay">
                    <h6 className="card-title d-flex justify-content-end">
                        <span className={`fs-6 fw-bold ${checkAwardType?.AwardTypeColor} px-3 py-1 text-white rounded rounded-2`}>{checkAwardType?.AwardTypeName}</span>
                    </h6>
                    <div className="align-self-end mt-2 pt-5 rounded-bottom border-0">
                        <span className="fs-4 fw-bold text-black">{formattingNumber(items.award_price)}</span>
                    </div>
                </div>
            </div>
            <div className="align-self-center w-50 p-2">
                <span className="fs-5 fw-semibold">{items.award_description}</span>
            </div>
        </>
    )
}