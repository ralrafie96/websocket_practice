import React, { useEffect, useState } from 'react'
import { useDebounce } from '../hooks/useDebounce';
import { History } from '../components/history';
import { Users } from '../components/users';
import { DocEditor } from '../components/docEditor';

export const Doc = () => {
    return (
        <div className="main-content">
            <div className="document-holder">
                <div className="currentusers">
                    <Users />
                </div>
                <DocEditor />
            </div>
            <div className="history-holder">
                <History />
            </div>
        </div>
    )
}
